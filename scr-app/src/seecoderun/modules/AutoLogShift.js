import j from "jscodeshift";
import _ from 'lodash';

export const toAst = (source, options) => {
    if (options) {
        return j(source, options);
    }
    return j(source);
};

export const alt = {
    Expression: 'Expression',
    ExpressionIdiom: 'ExpressionIdiom',
    BlockStart: 'BlockStart',
    BlockEnd: 'BlockEnd',
    BlockControl: 'BlockControl'
};

export const l = {
    autoLogId: 'autoLog',
    preAutoLogId: 'preAutoLog',
    postAutoLogId: 'postAutoLog',
};

class AutoLogShift {
    constructor(autoLogName, preAutoLogName, postAutoLogName) {
        this.autoLogName = l.autoLogId = autoLogName;
        this.preAutoLogName = l.preAutoLogId = preAutoLogName;
        this.postAutoLogName = l.postAutoLogId = postAutoLogName;
    }

    autoLogSource(text, locationMap, getLocationId) {
        let ast = toAst(text);
        if (!getLocationId) {
            getLocationId = () => locationMap.keys().length;
        }
        //  wrapFunctionExpressions(ast, locationMap);
        this.autoLogCallExpressions(ast, locationMap, getLocationId);
        return ast;
    }

    autoLogAst(ast, locationMap, getLocationId) {
        // console.log('al',!!ast, !!locationMap);
        //  wrapFunctionExpressions(ast, locationMap);
        // this.autoLogCallExpressions(ast, locationMap, getLocationId);
        // try {
        const expressionPaths = [];
        ast.find(j.Expression).forEach(
            path => expressionPaths.unshift(path)
        );
        const blockPaths = [];
        ast.find(j.BlockStatement).forEach(
            path => blockPaths.unshift(path)
        );
        this.autoLogExpressions(ast, expressionPaths, locationMap, getLocationId);
        this.autoLogBlocks(ast, blockPaths, locationMap, getLocationId);
        // } catch (e) {
        //   console.log('j', e)
        // }

        console.log(locationMap);
        return ast;
    }

    autoLogExpression(expression, id, type, path, p, params) {
        const jid = j.identifier(`'${id}'`);
        const jValue = _.isString(expression) ? j.identifier(expression) : expression;
        params = params || [
            j.callExpression(j.identifier(l.preAutoLogId),
                [
                    jid,
                ]),
            jValue,
            j.callExpression(j.identifier(l.postAutoLogId), [jid]),
        ];
        const alExpression = j.memberExpression(j.callExpression(j.identifier(l.autoLogId), params), j.identifier('_'), false);
        alExpression.autologId = id;
        return alExpression;
    }

    static SupportedExpressions = [
        'ThisExpression', // this
        'ArrayExpression', // [...]
        'ObjectExpression', // {...}
        'UnaryExpression', // !x
        'UpdateExpression', // x++
        'BinaryExpression', // x>y
        'LogicalExpression', // x && y
        'ConditionalExpression', // x?x:y
        'CallExpression', // x()
        'NewExpression', // new X
        'MemberExpression', // x.y, except x.y =...
        'AssignmentExpression', // x=y; todo needs extra statement al(id='x', val=x)
        'Identifier', // Property, PropertyClass
        // 'Property',// is checked with parent via Identifier child
        // 'FunctionExpression', is as block
        // 'ArrowFunctionExpression',  is as block
    ];

    static SupportedBlockExpressions = [
        'FunctionExpression', // x= function (...){...}
        'ArrowFunctionExpression', // (...)=>{...},..., x=>y
    ];

    static SupportedBlocks = [
        // 'Function', //?
        'FunctionDeclaration', // function x(...){...}
        'MethodDefinition', // Class X{ x(...){...} x=(...)=>{...}},
        'IfStatement', // if(...){...}else{...}
        'SwitchStatement',
        'SwitchCase',
        'ReturnStatement',
        'ThrowStatement',
        'TryStatement',
        'WhileStatement',
        'DoWhileStatement',
        'ForStatement',
        'ForInStatement',
        'DoWhileStatement',
        //Program  is not a block
    ];

    static IdentifierIgnores = [
        // 'ThisExpression',
        // 'ArrayExpression',
        'ObjectExpression',
        'UnaryExpression',
        'UpdateExpression',
        'BinaryExpression',
        'CallExpression',
        'NewExpression',
        'MemberExpression',
        'AssignmentExpression',
        'FunctionExpression',
        'FunctionDeclaration',
        'ClassDeclaration',
        'MethodDefinition',
        'ImportDefaultSpecifier',
        'ExportDefaultDeclaration',
    ];

    static ignorePatterns = [
        'SpreadElementPattern',
        'SpreadPropertyPattern',
        'PropertyPattern',
        'ObjectPattern',
        'ArrayPattern',
        'AssignmentPattern',
    ];

    composedExpressions = {
        MemberExpression: ({ast, locationMap, getLocationId, path}, {pathSource, id, type, p}) => {
            const jid = j.identifier(`'${id}'`);
            const object = path.value.object;//node
            // console.log(object)
            const property = path.value ? path.value.property : null;
            const propertyNode = property && property.computed ? property : j.identifier(`'${j(property).toSource()}'`);
            const objectId = object.loc ? getLocationId(object.loc, object.type) : object.autologId;
            const objectLoc = object.loc || (locationMap[objectId] || {}).loc;
            const propertyId =
                property.loc ? getLocationId(path.value.property.loc, path.value.property.type) : property.autologId;
            const propertyLoc = property.loc || (locationMap[propertyId] || {}).loc;
            let objectValue = null, propertyValue = null;
            if (objectId && !object.autologId) {
                locationMap[objectId] = {
                    type: alt.ExpressionIdiom,
                    expressionType: object.type,
                    loc: {...objectLoc},
                    parentId: id,
                };
                objectValue = `${j(object).toSource()}`;
            }
            // else{
            //     objectValue = `${j(object).toSource()}`;
            // }
            else{
                console.log('OBJ', id , object.autologId, locationMap[object.autologId], locationMap);
            }

            if (propertyId && !property.autologId) {
                locationMap[propertyId] = {
                    type: alt.ExpressionIdiom,
                    expressionType: property.type,
                    loc: {...propertyLoc},
                    parentId: id,
                };
                propertyValue = property.computed ? j(property).toSource() : `'${j(property).toSource()}'`;
            }
            const jValue = _.isString(pathSource) ? j.identifier(pathSource) : pathSource;
            const params = [
                j.callExpression(j.identifier(l.preAutoLogId),
                    [
                        jid,
                    ]),
                jValue,
                j.callExpression(j.identifier(l.postAutoLogId), [jid]),
                j.identifier(`'MemberExpression'`),
                j.identifier(`['${objectId}', '${propertyId}']`),
                j.identifier(`[${!object.autologId}, ${!property.autologId}]`),
                j.identifier(`[${objectValue}, ${propertyValue}]`),
            ];
            return this.autoLogExpression(pathSource, id, type, path, p, params);
        },
        BinaryExpression: ({ast, locationMap, getLocationId, path}, {pathSource, id, type, p}) => {
            const jid = j.identifier(`'${id}'`);
            const left = path.value ? path.value.left : null;
            const leftId = left.loc ? getLocationId(left.loc, left.type) : left.autologId;
            const leftLoc = left.loc || (locationMap[leftId] || {}).loc;
            const right = path.value ? path.value.right : null;
            const rightId = right.loc ? getLocationId(right.loc, right.type) : right.autologId;
            const rightLoc = right.loc || (locationMap[rightId] || {}).loc;
            let leftValue = null;
            let rightValue = null;

            if (leftId && !left.autologId) {
                locationMap[leftId] = {
                    type: alt.ExpressionIdiom,
                    expressionType: left.type,
                    loc: {...leftLoc},
                    parentId: id,
                };
                leftValue = j(left).toSource();
            }

            if (rightId && !right.autologId) {
                locationMap[rightId] = {
                    type: alt.ExpressionIdiom,
                    expressionType: right.type,
                    loc: {...rightLoc},
                    parentId: id,
                };
                rightValue = j(right).toSource();
            }
            const jValue = _.isString(pathSource) ? j.identifier(pathSource) : pathSource;
            const params = [
                j.callExpression(j.identifier(l.preAutoLogId),
                    [
                        jid,
                    ]),
                jValue,
                j.callExpression(j.identifier(l.postAutoLogId), [jid]),
                j.identifier(`'BinaryExpression'`),
                j.identifier(`['${leftId}', '${rightId}']`),
                j.identifier(`[${!left.autologId}, ${!right.autologId}]`),
                j.identifier(`[${leftValue}, ${rightValue}]`),
            ];
            return this.autoLogExpression(pathSource, id, type, path, p, params);
        },
        CallExpression: ({ast, locationMap, getLocationId, path}, {pathSource, id, type, p}) => {
            const jid = j.identifier(`'${id}'`);
            console.log('c', path.value);
            const callee = path.value ? path.value.callee : null;
            const calleeId = callee.loc ? getLocationId(callee.loc, callee.type) : callee.autologId;
            const calleeLoc = callee.loc || (locationMap[calleeId] || {}).loc;
            const parameters = path.value ? path.value.parameters : null;
            const parameterNodes= [];

            // const parametersId = parameters.loc ? getLocationId(parameters.loc, parameters.type) : parameters.autologId;
            // const parametersLoc = parameters.loc || (locationMap[parametersId] || {}).loc;
            let calleeValue = null;
            // let parametersValue = null;

            if (calleeId && !callee.autologId) {
                locationMap[calleeId] = {
                    type: alt.ExpressionIdiom,
                    expressionType: callee.type,
                    loc: {...calleeLoc},
                    parentId: id,
                };
                calleeValue = j(callee).toSource();
            }

            // if (parametersId && !parameters.autologId) {
            //     locationMap[parametersId] = {
            //         type: alt.ExpressionIdiom,
            //         expressionType: parameters.type,
            //         loc: {...parametersLoc},
            //         parentId: id,
            //     };
            //     parametersValue = j(parameters).toSource();
            // }
            const jValue = _.isString(pathSource) ? j.identifier(pathSource) : pathSource;
            const params = [
                j.callExpression(j.identifier(l.preAutoLogId),
                    [
                        jid,
                    ]),
                jValue,
                j.callExpression(j.identifier(l.postAutoLogId), [jid]),
                j.identifier(`'CallExpression'`),
                j.identifier(`['${calleeId}']`),
                j.identifier(`[${!callee.autologId}]`),
                j.identifier(`[${calleeValue}]`),
            ];
            // j.identifier(`['${calleeId}', '${parametersId}']`),
            //     j.identifier(`[${!callee.autologId}, ${!parameters.autologId}]`),
            //     j.identifier(`[${calleeValue}, ${parametersValue}]`),
            return this.autoLogExpression(pathSource, id, type, path, p, params);
        },
        // NewExpression: (ast, locationMap, getLocationId, path) => {
        // },
        // FunctionExpression: (ast, locationMap, getLocationId, path) => {
        // },
    };


    static isInPattern = (path) => {
        while (path) {
            if (path.value && AutoLogShift.ignorePatterns.includes(path.value.type)) {
                return true;
            }
            path = path.parentPath;
        }
        return false;
    };

    composedBlocks = {
        FunctionDeclaration:
            ({ast, locationMap, getLocationId, path}, {id, type}, {parentType, parentLoc, parentId}) => {
                const jid = j.identifier(`'${parentId}'`);
                const jValue = j.identifier('arguments');
                // locationMap[parentId] = {
                //     type: alt.BlockStart,
                //     expressionType: parentType,
                //     loc: {...parentLoc},
                //     blockId: id,
                // };
                // console.log('f', path);
                // const params = [
                //     j.callExpression(j.identifier(l.preAutoLogId),
                //         [
                //             jid,
                //         ]),
                //     jValue,
                //     j.callExpression(j.identifier(l.postAutoLogId), [jid]),
                //     j.identifier(`'FunctionDeclaration'`),
                //     j.identifier(`['${leftId}', '${rightId}']`),
                //     j.identifier(`[${!left.autologId}, ${!right.autologId}]`),
                //     j.identifier(`[${leftValue}, ${rightValue}]`),
                // ];
                // return this.autoLogExpression(pathSource, id, type, path, p, params);

                // const body = path.value.body;
                // if (body.length && j(body[0]).toSource().startsWith('super')) {
                //     const superS = body[0];
                //     body.unshift(j.expressionStatement(j.identifier('//start')));
                //     body[1] = body[0];
                //     body[0] = superS;
                // } else {
                //     body.unshift(j.expressionStatement(j.identifier('//start')));
                // }


                // console.log(body[body.length-1]);
                // if(body.length && body[body.length-1].type !== 'ReturnStatement'){
                //   id = locationMap.length;
                //   locationMap.push({type: FUNCTION_END, expressionType: body[body.length-1].type,loc:{...path.value.loc}});
                //
                //   body.push(j.expressionStatement(j.callExpression(
                //     j.identifier('_'),
                //     []
                //   )));
                // }
                // console.log(path.value.loc);


                // j(path).find(j.ReturnStatement).replaceWith(p =>{
                //     const parametersSource = j(p.value.argument).toSource();
                //     return  j.returnStatement(j.callExpression(j.identifier('_'),
                //       [j.identifier(parametersSource)]));
                //   }
                // );
                // return p;
            },
    };

    autoLogExpressions(ast, paths, locationMap, getLocationId) {
        for (const i in paths) {
            const path = paths[i];
            const type = path.value ? path.value.type : null;
            const loc = type ? path.value.loc : null;
            let id = loc ? getLocationId(loc, type) : null;

            const parentPath = path ? path.parentPath : null;
            const parentType = parentPath.value ? parentPath.value.type : null;
            const parentLoc = parentType ? parentPath.value.loc : null;
            let parentId = parentLoc ? getLocationId(parentLoc, parentType) : null;

            if (id) {
                if (AutoLogShift.SupportedExpressions.includes(type)) {
                    let isValid = true;
                    if (type === j.MemberExpression.name && parentType === j.CallExpression.name) {
                        isValid = false; // c of c() => handled in parent
                    }

                    if (type === j.CallExpression.name && path.value.callee.type === 'Super') {
                        isValid = false; // c of c() => handled in parent
                    }

                    if (path.name === 'left' && parentType === j.AssignmentExpression.name) {
                        isValid = false; // x of x= y => handled in parent
                    }

                    if (path.name === 'id' && parentType === j.VariableDeclarator.name) {
                        isValid = false; //  x of let x=y => handled in parent
                    }

                    if (type === j.Identifier.name
                        && (AutoLogShift.IdentifierIgnores.includes(parentType)
                            || (parentPath && parentPath.name === 'params'))) {
                        isValid = false; //  x of function x(...) , x of function (x)... => handled in parent
                    }

                    if (AutoLogShift.isInPattern(path)) {
                        isValid = false; // x of {x}, [x]... object deconstruction => handled in parent.
                    }


                    if (isValid) {
                        j(path).replaceWith(p => {
                                const pathSource = j(p).toSource();
                                locationMap[id] = {
                                    type: alt.Expression,
                                    expressionType: type,
                                    loc: {...path.value.loc},
                                    parentId: parentId,
                                };

                                if (this.composedExpressions[type]) {
                                    return this.composedExpressions[type]({ast, locationMap, getLocationId, path}, {
                                        pathSource,
                                        id,
                                        type,
                                        p
                                    });
                                } else {

                                    if ((parentType === 'Property' || parentType === 'ClassProperty')
                                        && path.name === 'key') {
                                        if (parentPath.computed) { // logs {[x]:...}
                                            return j.arrayExpression(
                                                [this.autoLogExpression(pathSource, id, type, path, p)]
                                            );
                                        } else { // ignores {d:...}
                                            parentPath.computed = true;
                                            // return j.arrayExpression(
                                            //     [j.identifier(`'${pathSource}'`)]
                                            // );
                                            return j.arrayExpression(
                                                [this.autoLogExpression(`'${pathSource}'`, id, type, path, p)]
                                            );
                                        }

                                    } else {
                                        return this.autoLogExpression(pathSource, id, type, path, p);
                                    }
                                }
                            }
                        );
                    } else {
                            console.log('passing to parent', type, loc, path);
                    }
                } else {
                    if (AutoLogShift.SupportedBlocks.includes(type)) {
                        // console.log('block', type, loc, path);
                    } else {
                        console.log('ignored', type, loc, path);
                    }
                }
            } else {
                if (!type === j.FunctionExpression.name) {
                    console.log('critical', type, loc, path);
                }
            }
        }

    }

    autoLogBlocks(ast, paths, locationMap, getLocationId) {

        for (const i in paths) {
            const path = paths[i];
            const type = path.value ? path.value.type : null;
            const loc = type ? path.value.loc : null;
            let id = loc ? getLocationId(loc, type) : null;
            console.log('all', path.parentPath.value.loc && path.parentPath.value.loc.start.line);
            if (id) {
                if (path.parentPath) {
                    const parentType = path.parentPath.value.type;
                    const parentLoc = parentType ? path.parentPath.value.loc : null;
                    let parentId = parentLoc ? getLocationId(parentLoc, parentType) : null;
                    if (parentId) {
                        if (AutoLogShift.SupportedBlocks.includes(parentType)) {
                            if (this.composedBlocks[parentType]) {
                                return this.composedBlocks[parentType]
                                (
                                    {ast, locationMap, getLocationId, path},
                                    {id, type},
                                    {parentType, parentLoc, parentId}
                                );
                            }
                        } else {
                            console.log('critical parent', type, loc, path, parentType, parentLoc);
                        }
                    } else {
                        console.log('ignored', path);
                    }
                } else {
                    console.log('ignored no parent', path,);
                }
            }
            else {
                if (AutoLogShift.SupportedExpressions.includes(type)) {
                    //console.log('block', expressionType, loc, path);
                } else {
                    console.log('critical', type, loc, path);
                }
            }
        }

    }

}

export default AutoLogShift;