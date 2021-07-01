import React, {
    createRef,
    PureComponent,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState
} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import debounce from 'lodash/debounce';
import throttle from 'lodash/throttle';
import isString from 'lodash/isString';
import isEqual from 'lodash/isEqual';
import isFunction from 'lodash/isFunction';

import {withStyles} from '@material-ui/styles';
import {alpha} from '@material-ui/core/styles';
import Portal from '@material-ui/core/Portal';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

import JSEN from '../utils/JSEN';
import AutoLog from '../core/modules/AutoLog';
import {
    updateBundle,
    updateBundleFailure,
    updateBundleSuccess
} from "../redux/modules/liveExpressionStore";

import {
    createLiveObjectNodeRenderer,
    ExplorerTooltip,
    ExplorerTooltipContainer,
    hasOwnTooltip,
    ObjectRootLabel,
} from '../components/ObjectExplorer';
import LiveExpression from '../components/LiveExpression';
import {PastebinContext} from './Pastebin';
import OverflowComponent from '../components/OverflowComponent';
import {NavigationTypes} from '../core/modules/AutoLogShift';
import {monacoProps} from '../utils/monacoUtils';
import GraphicalQuery from '../components/GraphicalQuery';
import TimelineBranchManager from '../core/modules/TimelineBranchManager';
import {
    MonacoExpressionClassNames,
    MonacoHighlightTypes,
    ThemesRef,
} from '../themes';

let monaco = null;

const mapStateToProps = (
    {monacoEditorsReducer, pastebinReducer}
    , {editorId}
) => {
    monaco = monaco || window.monaco;
    const {monacoEditorsStates} = monacoEditorsReducer;
    const {editorsTexts} = pastebinReducer;
    const newFirecoPad = monacoEditorsStates && monacoEditorsStates[editorId] ?
        monacoEditorsStates[editorId].firecoPad : null;
    if (newFirecoPad) {
        return {editorsTexts, firecoPad: newFirecoPad};
    } else {
        return {editorsTexts};
    }
}
const mapDispatchToProps = {
    updateBundle,
    updateBundleFailure,
    updateBundleSuccess
};

const goToTimelineBranchInactive = (/*timelineI*/) => {
};
let goToTimelineBranch = goToTimelineBranchInactive;

export const configureGoToTimelineBranch = () => {
    return goToTimelineBranch;
};



const BRANCH_LINE_DECORATION_WIDTH = 3;

const NavigatorTooltip = withStyles((theme) => ({
    tooltip: {
        backgroundColor: theme.palette.background.paper,
        maxWidth: "none",
        border: 'none',
        padding: 0,
        margin: 0,
        marginBottom: 18,
    },
}))(Tooltip);

const styles = (theme) => {
    const {highlighting: HighlightPalette} = ThemesRef.current;

    return {
        '@global': {
            '.monaco-editor div.margin': {
                zIndex: '1000 !important',
            },
            [`.${MonacoExpressionClassNames.defaultExpressionClassName}`]: {
                opacity: 0.4,
                filter: 'greyscale(85%)',
                // fontWeight: 100,
            },
            [`.${MonacoExpressionClassNames.deadExpressionClassName}`]: {
                opacity: '0.467 !important',
                filter: 'greyscale(85%) !important',
                fontWeight: '100 !important',
                // opacity: 0.4,
                // filter: 'greyscale(85%)',
                // fontWeight: 100,
                //  border: '2px solid red'
            },
            [`.${MonacoExpressionClassNames.liveExpressionClassName}`]: {
                opacity: '1',
                filter: 'unset',
                fontWeight: 'normal',
                border: 'none',
                transition: ['opacity', 'filter', 'fontWeight'],
                transitionDuration: 2000,
            },
            [`.${MonacoExpressionClassNames.liveExpressionNavClassName}`]: {
                paddingLeft: theme.spacingUnit(2),
                // zIndex: theme.zIndex.tooltip,
            },
            [`.${
                MonacoExpressionClassNames.liveExpressionDependencyClassName
            }`]: {
                opacity: '1 !important',
                filter: 'unset',
                fontWeight: 'bolder',
                border: 'none',
                transition: ['opacity', 'filter', 'fontWeight'],
                transitionDuration: 2000,
            },
            [`.${MonacoExpressionClassNames.errorExpressionClassName}`]: {
                opacity: '1',
                filter: 'unset',
                fontWeight: 'bolder',
                borderTop: '1px solid red',
                borderBottom: '2px solid red',
                backgroundColor: HighlightPalette.error,
            },
            [`.${
                MonacoExpressionClassNames.errorExpressionClassName
            }-lineDecoration`]: {
                backgroundColor: 'red',
                margin: theme.spacing(1),
                top: theme.spacing(0.5),
                height: `${theme.spacing(1)} !important`,
                width: `${theme.spacing(1)} !important`,
            },
            [`.${MonacoExpressionClassNames.branchExpressionClassName}`]: {
                opacity: 1,
                filter: 'unset !important',
                fontWeight: 700,
            },
            [`.${MonacoHighlightTypes.text}`]: {
                backgroundColor: HighlightPalette.text,
            },
            [`.${MonacoHighlightTypes.text}-match`]: {
                backgroundColor: alpha(theme.palette.primary.light, 0.15),
            },
            [`.${MonacoHighlightTypes.error}`]: {
                backgroundColor: HighlightPalette.error,
                border: '1px solid red',
            },
            [`.${MonacoHighlightTypes.graphical}`]: {
                backgroundColor: alpha(HighlightPalette.graphical, 0.35),
            },
            [`.${MonacoHighlightTypes.graphical}-match`]: {
                backgroundColor: alpha(theme.palette.secondary.light, 0.25),
            },
            [`.${MonacoHighlightTypes.globalBranch}`]: {
                //  backgroundColor: HighlightPalette.globalBranch,
                // borderTop: `1px solid${theme.palette.primary.main}`,
                // borderBottom: `1px solid${theme.palette.primary.main}`,
            },
            [`.${MonacoHighlightTypes.globalBranch}-decoration`]: {
                marginLeft: BRANCH_LINE_DECORATION_WIDTH,
                background: `linear-gradient(90deg, ${
                    theme.palette.primary.main
                } ${BRANCH_LINE_DECORATION_WIDTH}px, ${
                    HighlightPalette.globalBranch
                } ${BRANCH_LINE_DECORATION_WIDTH}px)`,
            },
            [`.${MonacoHighlightTypes.globalBranch}-default-decoration`]: {
                //  marginLeft: BRANCH_LINE_DECORATION_WIDTH,
                background: `red`,
                zIndex: 10000,
            },
            [`.${MonacoHighlightTypes.globalBranch}-delimiter-decoration`]: {
                marginLeft: BRANCH_LINE_DECORATION_WIDTH,
                background: `linear-gradient(0deg,  ${
                    'transparent'
                } ${monacoProps.lineOffSetHeight}px, ${
                    theme.palette.primary.main
                } ${monacoProps.lineOffSetHeight}px, ${
                    'transparent'
                } ${
                    monacoProps.lineOffSetHeight + BRANCH_LINE_DECORATION_WIDTH
                }px)`,
            },
            [`.${MonacoHighlightTypes.localBranch}`]: {
                //  backgroundColor: HighlightPalette.localBranch,
                // borderTop: `1px solid${theme.palette.secondary.main}`,
                // borderBottom: `1px solid${theme.palette.secondary.main}`,
            },
            [`.${MonacoHighlightTypes.localBranch}-decoration`]: {
                marginLeft: BRANCH_LINE_DECORATION_WIDTH,
                background: `linear-gradient(90deg, ${
                    theme.palette.secondary.main
                } ${BRANCH_LINE_DECORATION_WIDTH}px, ${
                    HighlightPalette.localBranch
                } ${BRANCH_LINE_DECORATION_WIDTH}px)`,
            },
            [`.${MonacoHighlightTypes.localBranch}-delimiter-decoration`]: {
                marginLeft: BRANCH_LINE_DECORATION_WIDTH,
                background: `linear-gradient(0deg,  ${
                    HighlightPalette.localBranch
                } ${monacoProps.lineOffSetHeight}px, ${
                    theme.palette.secondary.main
                } ${monacoProps.lineOffSetHeight}px, ${
                    HighlightPalette.localBranch
                } ${
                    monacoProps.lineOffSetHeight + BRANCH_LINE_DECORATION_WIDTH
                }px)`,
            },
        },
        popoverPaper: {
            overflow: 'auto',
            maxWidth: 'unset',
            maxHeight: 'unset',
        },
        popover: { // restricts backdrop from being modal
            width: 0,
            height: 0,
        },

        rangeSlider: {
            padding: theme.spacing(1),
        },
        badgeRoot: {
            position: 'relative',
            display: 'inline-flex',
            // For correct alignment with the text.
            verticalAlign: 'middle',
        },
        liveBadge: {
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            position: 'absolute',
            zIndex: 10,
            bottom: 0,
            left: 0,
            background: 'red',
            margin: 0,
            padding: 0,
            width: 2,
            height: 2,
        },
        liveExpressionRoot: {
            // zIndex: 1000,
            position: 'relative',
            overflow: 'hidden',
            paddingRight: theme.spacing(1),
            paddingBottom: 0,
        },
        liveExpressionContainerUpdated: {
            left: '50%',
            transition: ['filter', 'opacity', 'color',],
            transitionDuration: 1000,
            backgroundColor: theme.palette.mode === 'light' ?
                '#fffffe' : '#1e1e1e',// monaco bg colors
        },
        liveExpressionCallExpressionContainerUpdated: {
            transition: ['filter', 'opacity', 'color',],
            transitionDuration: 1000,
            backgroundColor: theme.palette.mode === 'light' ?
                '#fffffe' : '#1e1e1e',// monaco bg colors
        },
        liveExpressionContainerUpdating: {
            filter: 'greyscale(90%)',
            opacity: 0.70,
            backgroundColor: 'transparent',
        },
        liveExpressionPaper: {
            backgroundColor: theme.palette.mode === 'light' ?
                '#fffffe' : '#1e1e1e',// monaco bg colors
        },
        liveExpressionContent: {
            // lineHeight: monacoProps.lineOffSetHeight,
            overflow: 'auto',
            position: 'relative',
            maxWidth: 'inherit',
            // paddingTop: theme.spacing(1),
        },
        branchNavigatorWidget: {
            lineHeight: 1,
            fontSize: 10,
            maxHeight: 14,
            minWidth: 0,
            minHeight: 0,
            paddingTop: 2,
            paddingRight: 4,
            paddingBottom: 2,
            paddingLeft: 2,
            margin: 0,
            width: '100%',
            height: '100%',
            borderRadius: 0,
            zIndex: 9999,
            // marginBottom: monacoProps.widgetMaxHeight,
        },
        overflowXIcon: {
            color: 'default',
            position: 'absolute',
            top: 2,
            right: 0,
            marginTop: -2,
            marginLeft: -2,
            marginRight: -4,
            padding: 2,
            // marginTop: theme.spacing(-1),
            fontSize: monacoProps.lineOffSetHeight,
        },
        updated: {
            transition: ['color'],
            transitionDuration: 2000,
        },
        updating: {
            color: theme.palette.secondary.main
        },
        navigatorLabelIndex: {
            fontSize: 11,
        },
        navigatorLabelTotal: {
            fontSize: 9,
            paddingTop: 3
        },
    }
};

// const objectIterator = createObjectIterator();

const TimelineNavigation = (({
                                 firecoPad,
                                 branchSelections,
                                 traceSubscriber,
                                 locationMap,
                                 timeline,
                                 prevTimelineI,
                                 currentBranchId,
                                 currentBranchTimelineId,
                                 classes,
                                 style,
                                 liveExpressionContainerClassName,
                                 decorators,
                                 currentContentWidgetId,
                                 Navigators,
                                 highlightLiveExpressions,
                                 unHighlightLiveExpressions,
                                 getGoToTimelineBranch,
                                 handleBranchChange,
                                 objectNodeRenderer,
                                 searchState,
                                 highlightSingleText,
                                 handleCurrentContentWidgetId,
                                 adjustWidth,
                                 setOnAdjustWidths,
                                 // highlightErrors,
                                 monacoRangesRef = {},
                                 VisualQueryManager,
                             }) => {
    const {getVisualIdsFromRefs} = VisualQueryManager;

    const locToMonacoRange =
        firecoPad && firecoPad.liveExpressionWidgetProvider.locToMonacoRange;

    const rangesRef = useRef(monacoRangesRef);
    const [tbm, liveRanges, ignoreRanges, defaultArray] = useMemo(() => {
            unHighlightLiveExpressions();
            return [
                new TimelineBranchManager(
                    branchSelections,
                    traceSubscriber, timeline, prevTimelineI,
                    currentBranchId, currentBranchTimelineId),
                [],
                [],
                [],
            ];
        },
        [
            unHighlightLiveExpressions,
            branchSelections,
            traceSubscriber, timeline, prevTimelineI,
            currentBranchId, currentBranchTimelineId,
        ]);

    const timelineBranchManager = tbm;

    const navRanges = useMemo(() => {
        timelineBranchManager.branches.map(branch => {
            const navLoc = {
                start: branch.loc.start, end: {...branch.loc.start}
            };
            navLoc.end.column = navLoc.end.column + 1;
            // console.log('navRanges', branch, navLoc, branch.loc);
            return locToMonacoRange(navLoc);
        });
    }, [
        timelineBranchManager,
        locToMonacoRange,
    ]);
    // console.log(timeline);

    useEffect(() => {
        goToTimelineBranch = getGoToTimelineBranch(
            timeline, timelineBranchManager, handleBranchChange
        );
    }, [getGoToTimelineBranch, timeline, timelineBranchManager, handleBranchChange]);


    const currentTimeline = useMemo(() => (currentBranchId && currentBranchTimelineId) ?
        timeline.slice(timeline.length - currentBranchTimelineId) : timeline,
        [currentBranchId, currentBranchTimelineId, timeline]);

    const navigatorWidgetIds = {};
    const globalNavigators = !!firecoPad && (<Navigators
        firecoPad={firecoPad}
        navigationType={NavigationTypes.Global}
        _branches={tbm.branches}
        branched={tbm.globalBranches}
        absoluteBranched={tbm.absoluteGlobalBranches}
        currentBranched={tbm.currentGlobalBranches}
        color={'primary'}
        classes={classes}
        style={style}
        liveExpressionContainerClassName={liveExpressionContainerClassName}
        rangesRef={rangesRef}
        locationMap={locationMap}
        navigatorWidgetIds={navigatorWidgetIds}
        decorators={decorators}
        branchSelections={branchSelections}
        currentContentWidgetId={currentContentWidgetId}
    />);

    const localNavigators = !!firecoPad && (<Navigators
        firecoPad={firecoPad}
        navigationType={NavigationTypes.Local}
        _branches={tbm.branches}
        branched={tbm.localBranches}
        absoluteBranched={null}
        currentBranched={null}
        color={'secondary'}
        classes={classes}
        style={style}
        liveExpressionContainerClassName={liveExpressionContainerClassName}
        rangesRef={rangesRef}
        locationMap={locationMap}
        navigatorWidgetIds={navigatorWidgetIds}
        decorators={decorators}
        branchSelections={branchSelections}
        currentContentWidgetId={currentContentWidgetId}
    />);

    const liveExpressionWidgets = {};
    // (tbm.globalBranchLocs && tbm.globalBranchLocs.loc) ?
    //     this.highlightBranch(
    //     NavigationTypes.Global, tbm.globalBranchLocs.loc
    //     )
    //     : this.highlightBranch(NavigationTypes.Global);
    //
    // (tbm.localBranchLocs && tbm.localBranchLocs.loc) ?
    //     this.highlightBranch(
    //     NavigationTypes.Local, tbm.localBranchLocs.loc
    //     )
    //     : this.highlightBranch(NavigationTypes.Local);


    //   this.highlightBranches(NavigationTypes.Global, ignoreRanges);
    const liveExpressions = (decorators || []).map(widget => {
        // console.log(widget.id, autoLog);
        let data = [];
        (currentTimeline || []).forEach(entry => {
            (entry.id === widget.id && entry.expressionType !== 'Literal') &&
            data.unshift(entry);
        });//autoLogger.trace.getData(widget.id);

        if (data.length) {
            // widget.contentWidget.domNode.style.backgroundColor = 'orange';
            // widget.contentWidget.domNode.style.fontSize = '8px';


            let datum = null;
            let entry = null;
            try {
                //todo needs parsed memoizing
                datum =
                    data[data.length - 1].isError ?
                        data[data.length - 1].data
                        : JSEN.parse(data[data.length - 1].data);
                entry = data[data.length - 1];
                // datum = isString(data[data.length - 1].data) ?
                // JSAN.parse(data[data.length - 1].data)
                // : data[data.length - 1].data;
            } catch (e) {
                // console.log(data[data.length - 1], e)
            }

            if (entry
                && (entry.expression
                    && entry.expression.expressionType === 'BinaryExpression')
                && (entry.parentExpression
                    && entry
                        .parentExpression.expressionType === 'WhileStatement')
            ) {
                // console.log('BE', entry);
            } else {
                liveExpressionWidgets[widget.id] = {datum, widget, entry};
            }

            //todo assignemntexp
            if (entry
                && (entry.expression
                    && entry.expression.expressionType === 'VariableDeclarator')
                && isFunction(entry.value)
            ) {
                const range = locToMonacoRange(entry.loc);
                range && liveRanges.push(range);
            } else {

                widget.range && liveRanges.push(widget.range);
            }

            // }
            //  if (hasChildNodes(datum, objectIterator)) {
            //    // let text = '';
            //    // for (let {name, data, ...props} of objectIterator(datum)) {
            //    //   text = `${text}, ${name}`;
            //    // }
            //    const val = objectIterator(datum).next().value;
            //    console.log(val);
            //    widget.contentWidget.getElement().innerText =
            //    `{${val ? val.name : val}}`;
            //    // console.log(objectIterator(datum).next().value)
            //  } else {
            //    const val = objectIterator(datum).next().value;
            //    widget.contentWidget.getElement().innerText =
            //    `${val ? val.name : val}`;
            //  }
            //  widget.contentWidget.getElement().className='';
            // liveExpressionWidgetProvider
            // .colorizeElement(widget.contentWidget.getElement());

        } else {
            // widget.contentWidget.getElement().innerText = '';
            //  widget.contentWidget.domNode.style.backgroundColor =
            //  'transparent';
        }
        //  liveExpressionWidgetProvider.colorizeElement(
        //  widget.contentWidget.getElement()
        //  );
        // widget.contentWidget.domNode.style.borderTop = '2px solid blue';

        return (<LiveExpression
            entry={widget}
            style={style}
            key={widget.id}
            expressionId={widget.id}
            classes={classes}
            widget={widget}
            data={data}
            isOpen={data.length > 0 && currentContentWidgetId === widget.id}
            objectNodeRenderer={objectNodeRenderer}
            //handleChange={this.handleObjectExplorerExpand}
        />);
    });

    let visualIds = [];

    const liveWidgets = [];

    for (const i in liveExpressionWidgets) {
        if (liveExpressionWidgets[i]) {
            const {datum, widget, entry} = liveExpressionWidgets[i];
            const n = entry;
            // console.log('locationMap', n, locationMap[n.id]);
            const isOutput = n.outputRefs && n.outputRefs.length;
            const isSelected = isOutput &&
                n.outputRefs.find(
                    ref => searchState.visualQuery
                        && searchState.visualQuery.find(v => v === ref)
                );

            const range = n.loc ? locToMonacoRange(n.loc)
                : null;

            if (n.isError) {

                widget.contentWidget.domNode.dataset.isError = 'true';

                highlightSingleText(
                    n.loc, MonacoHighlightTypes.error,
                    traceSubscriber
                        .getMatches(n.funcRefId, n.dataRefId, n.calleeId), false);


                const contentRef = createRef();
                liveWidgets.push({
                    contentRef,
                    n,
                    domNode: widget.contentWidget.domNode,
                    range,
                    configureLiveWidget: () =>
                        <Portal key={widget.id}
                                container={widget.contentWidget.domNode}>
                            {
                                <div
                                    // style={{
                                    //     // zIndex: 9999,
                                    //     color: 'red',
                                    //     border: '1px red solid',
                                    //     // marginTop: 1,
                                    //     // marginLeft: 0,
                                    //     // marginBottom: 0,
                                    //     // paddingBottom: 0,
                                    // }}
                                    ref={contentRef}
                                    onMouseEnter={() => {
                                        // console.log(entry);
                                        highlightSingleText(
                                            n.loc, n.isError ?
                                                MonacoHighlightTypes.error
                                                : n.isGraphical ?
                                                    MonacoHighlightTypes.graphical
                                                    : MonacoHighlightTypes.text,
                                            traceSubscriber
                                                .getMatches(
                                                    n.funcRefId,
                                                    n.dataRefId,
                                                    n.calleeId
                                                ), false);
                                        handleCurrentContentWidgetId(widget.id);
                                    }}
                                    onMouseLeave={() => {
                                        highlightSingleText();
                                        handleCurrentContentWidgetId();
                                    }}
                                    // className=
                                    // {n.expressionType === 'CallExpression' ?
                                    // classes
                                    // .liveExpressionCallExpressionContainerUpdated
                                    // : liveExpressionContainerClassName}
                                    className={liveExpressionContainerClassName}
                                >

                                    {/*<OverflowComponent*/}
                                    {/*    overflowXClassName={*/}
                                    {/*        classes.liveExpressionRoot*/}
                                    {/*    }*/}
                                    {/*    contentClassName={*/}
                                    {/*        classes.liveExpressionContent*/}
                                    {/*    }*/}
                                    {/*    disableOverflowDetectionY={true}*/}
                                    {/*    contentAlign={'left'*/}
                                    {/*    }*/}
                                    {/*    overflowXAdornment={<MoreHorizIcon*/}
                                    {/*        className={classes.overflowXIcon}/>}*/}
                                    {/*    //  placeholder={*/}
                                    {/*    //  <Typography>Yo</Typography>*/}
                                    {/*    //  }*/}
                                    {/*    //  placeholderClassName={*/}
                                    {/*    //  classes.expressionCellContent*/}
                                    {/*    //  }*/}
                                    {/*    // placeholderDisableGutters={true}*/}
                                    {/*>*/}
                                    {/*<div>{n.expressionType}</div>*/}
                                    {isOutput ?
                                        <GraphicalQuery
                                            outputRefs={n.outputRefs}
                                            visualIds={
                                                getVisualIdsFromRefs(
                                                    n.outputRefs
                                                )
                                            }
                                            selected={!!isSelected}
                                        />
                                        :
                                        <ObjectRootLabel
                                            data={datum}
                                            compact={true}
                                            expressionType={n.expressionType}
                                            iconify={false}
                                        />
                                    }
                                    {/*</OverflowComponent>*/}

                                </div>
                            }
                        </Portal>
                });
                continue;
            }
            let ignore = range && ignoreRanges.find(r => {
                return r?.containsRange?.(range);
            });
            // ignore = n.isError? false: ignore;

            const isIcon = range ?
                range.startLineNumber === range.endLineNumber
                && range.endColumn - range.startColumn === 1
                : false;
            const isAlignLeft = (entry.expression && entry.expression.isReturn)
                || entry.expressionType === 'CallExpression';

            // ignore && console.log('n', n, ignoreRanges, ignore);
            if (widget.contentWidget && n.expression && !ignore) {
                const end = locToMonacoRange(n.expression.statementEndLoc);
                end && liveRanges.push(end);

                if (
                    n.expression.isJSX
                    && n.expression.jsxElements
                    && !n.expression.jsxElements.error
                ) {
                    n.expression.jsxElements.openingElements.forEach(elem => {
                        const openingE = locToMonacoRange(elem);
                        openingE && liveRanges.push(openingE);
                    });
                    n.expression.jsxElements.closingElements.forEach(elem => {
                        const closingE = locToMonacoRange(elem);
                        closingE && liveRanges.push(closingE);
                    });
                    n.expression.jsxElements.attributes.forEach(elem => {
                        const att = locToMonacoRange(elem);
                        att && liveRanges.push(att);
                    });
                    n.expression.jsxElements.children.forEach(elem => {
                        const child = locToMonacoRange(elem);
                        child && liveRanges.push(child);
                    });
                    n.expression.jsxElements.parents.forEach(elem => {
                        const parent = locToMonacoRange(elem);
                        parent && liveRanges.push(parent);
                    });
                }

                if (
                    n.expression.isTest
                    && n.expression.extraLocs
                    && n.expression.extraLocs.testableStatement
                ) {
                    //n.expression.isTest && console.log('TEST', n.expression);
                    const testableLoc =
                        n.expression.testableStatementType
                        === 'DoWhileStatement' ? {
                            start: {
                                line: n.expression.extraLocs.body.end.line,
                                column: n.expression.extraLocs.body.end.column
                            }
                            , end: {
                                line:
                                n
                                    .expression
                                    .extraLocs.testableStatement.end.line,
                                column:
                                    n
                                        .expression
                                        .extraLocs
                                        .testableStatement.end.column + 1,
                            }
                        } : {
                            start: {
                                line:
                                n
                                    .expression
                                    .extraLocs.testableStatement.start.line,
                                column:
                                n
                                    .expression
                                    .extraLocs.testableStatement.start.column
                            }
                            , end: n.expression.extraLocs.body ? {
                                line: n.expression.extraLocs.body.start.line,
                                column:
                                n.expression.extraLocs.body.start.column,
                            } : n.expression.extraLocs.consequent &&
                            n.expression.extraLocs.consequent.start ? {
                                line:
                                n.expression.extraLocs.consequent.start.line,
                                column:
                                n.expression.extraLocs.consequent.start.column,
                            } : {
                                line: n.expression.loc.end.line,
                                column: n.expression.loc.end.column,
                            }
                        };
                    const testableRange = locToMonacoRange(testableLoc);

                    testableRange && liveRanges.push(testableRange);
                    const branch = {
                        expression: n.parentExpression,
                        type: n.parentExpression ?
                            n.parentExpression.expressionType : null,
                    };
                    branch.blockName =
                        branch.type === 'IfStatement' ?
                            datum ? 'consequent'
                                : 'alternate' : datum ? 'body' : null;

                    if (branch && branch.type === 'IfStatement'
                        && branch.expression
                        && branch.expression.extraLocs
                        && branch.expression.extraLocs.test) {

                        if (branch.expression.extraLocs.test) {
                            //{start:{line:0, column:0},
                            // end:{line:0, column:0}};
                            const controlLParLoc = {
                                start: {
                                    line: branch.expression.loc.start.line,
                                    column: branch.expression.loc.start.column,
                                },
                                end: {
                                    line:
                                    branch.expression.extraLocs.test.start.line,
                                    column:
                                    branch
                                        .expression.extraLocs.test.start.column,
                                }
                            };
                            const controlLParRange =
                                locToMonacoRange(controlLParLoc);
                            liveRanges.push(controlLParRange);

                            const controlRParLoc = {
                                start: {
                                    line:
                                    branch.expression.extraLocs.test.end.line,
                                    column:
                                    branch.expression.extraLocs.test.end.column,
                                },
                                end: {
                                    line:
                                    branch.expression.extraLocs.test.end.line,
                                    column:
                                        branch
                                            .expression
                                            .extraLocs.test.end.column + 1,
                                }
                            };
                            const controlRParRange =
                                locToMonacoRange(controlRParLoc);
                            liveRanges.push(controlRParRange);
                            // fix do while
                            if (branch.type === 'IfStatement') {
                                const ignoreName =
                                    branch.blockName === 'consequent' ?
                                        'alternate' : 'consequent';
                                const range =
                                    branch.expression.extraLocs[ignoreName] ?
                                        locToMonacoRange(
                                            branch
                                                .expression
                                                .extraLocs[ignoreName]
                                        )
                                        : null;
                                //  console.log('control:',
                                // branch.blockName,'ommitting', ignoreName,
                                // branch.expression.extraLocs, range,
                                // );
                                range && ignoreRanges.push(range);
                            }

                            if (branch.type === 'IfStatement'
                                && (branch.blockName === 'alternate')) {
                                const controlRParLoc = {
                                    start: {
                                        line:
                                        branch
                                            .expression
                                            .extraLocs.test.end.line,
                                        column:
                                            branch
                                                .expression
                                                .extraLocs.test.end.column + 1,
                                    },
                                    end: {
                                        line:
                                        branch
                                            .expression
                                            .extraLocs.consequent.end.line,
                                        column:
                                        branch
                                            .expression
                                            .extraLocs.consequent.end.column,
                                    }
                                };
                                const controlRParRange =
                                    locToMonacoRange(controlRParLoc);
                                liveRanges.push(controlRParRange);

                                const controlOpenBracketLoc =
                                    branch.expression.extraLocs.alternate ? {
                                        start: {
                                            line:
                                            branch
                                                .expression
                                                .extraLocs.consequent.end.line,
                                            column:
                                            branch
                                                .expression
                                                .extraLocs
                                                .consequent.end.column,
                                        },
                                        end: {
                                            line:
                                            branch
                                                .expression
                                                .extraLocs.alternate.end.line,
                                            column:
                                                branch
                                                    .expression
                                                    .extraLocs
                                                    .alternate.end.column + 1,
                                        }
                                    } : null;
                                const controlOpenBracketRange =
                                    controlOpenBracketLoc ?
                                        locToMonacoRange(controlOpenBracketLoc)
                                        : null;
                                controlOpenBracketRange
                                && liveRanges.push(controlOpenBracketRange);

                                const controlCloseBracketLoc = {
                                    start: {
                                        line: branch.expression.loc.end.line,
                                        column:
                                        branch.expression.loc.end.column,
                                    },
                                    end: {
                                        line: branch.expression.loc.end.line,
                                        column:
                                            branch
                                                .expression.loc.end.column + 1,
                                    }
                                };
                                const controlCloseBracketRange =
                                    locToMonacoRange(
                                        controlCloseBracketLoc
                                    );
                                liveRanges.push(controlCloseBracketRange);


                            } else {
                                if (branch.type !== 'DoWhileStatement') {
                                    const content =
                                        branch.type === 'IfStatement' ?
                                            'consequent' : 'body';
                                    const controlRParOpenBracketLoc = {
                                        start: {
                                            line:
                                            branch
                                                .expression
                                                .extraLocs.test.end.line,
                                            column:
                                                branch
                                                    .expression
                                                    .extraLocs
                                                    .test.end.column + 1,
                                        },
                                        end: {
                                            line:
                                            branch
                                                .expression
                                                .extraLocs[content].start.line,
                                            column:
                                            branch
                                                .expression
                                                .extraLocs[content]
                                                .start.column,
                                        }
                                    };
                                    const controlRParOpenBracketRange =
                                        locToMonacoRange(
                                            controlRParOpenBracketLoc
                                        );
                                    liveRanges.push(
                                        controlRParOpenBracketRange
                                    );

                                }
                            }


                            // branch.expression.
// console.log('loce', branch.expression.extraLocs[branch.blockName]);
                            const locO = branch
                                .expression.extraLocs[branch.blockName] ? {
                                start: {
                                    line:
                                    branch
                                        .expression
                                        .extraLocs[branch.blockName].start.line,
                                    column:
                                    branch
                                        .expression
                                        .extraLocs[branch.blockName]
                                        .start.column,
                                },
                                end: {
                                    line:
                                    branch
                                        .expression
                                        .extraLocs[branch.blockName].start.line,
                                    column:
                                        branch
                                            .expression
                                            .extraLocs[branch.blockName]
                                            .start.column + 1,
                                }
                            } : null;
                            const rangeO = locO ?
                                locToMonacoRange(locO)
                                : null;
                            rangeO && liveRanges.push(rangeO);
                            const locC =
                                branch.expression.extraLocs[branch.blockName] ?
                                    {
                                        start: {
                                            line:
                                            branch
                                                .expression
                                                .extraLocs[branch.blockName]
                                                .end.line,
                                            column:
                                                branch
                                                    .expression
                                                    .extraLocs[branch.blockName]
                                                    .end.column ?
                                                    branch
                                                        .expression
                                                        .extraLocs[
                                                        branch.blockName
                                                        ]
                                                        .end.column - 1
                                                    : branch
                                                        .expression
                                                        .extraLocs[
                                                        branch.blockName
                                                        ]
                                                        .end.column,
                                        },
                                        end: {
                                            line:
                                            branch
                                                .expression
                                                .extraLocs[branch.blockName]
                                                .end.line,
                                            column:
                                            branch
                                                .expression
                                                .extraLocs[branch.blockName]
                                                .end.column,
                                        }
                                    } : null;
                            const rangeC = locC ?
                                locToMonacoRange(locC)
                                : null;
                            rangeC && liveRanges.push(rangeC);
                            // console.log(branch.expression.extraLocs,
                            // branch.blockName
                            // , branch.expression.extraLocs[branch.blockName]);
                            //     this
                            // .highlightBranch(NavigationTypes.Local,
                            // branch.expression.extraLocs[branch.blockName])
                            //   : this.highlightBranch(NavigationTypes.Local);
                        }
                    }
                }
                if (
                    n.expression.isVariableDeclarator && n.expression.extraLocs
                ) {
                    const range = n.expression.extraLocs['kind'] ?
                        locToMonacoRange(n.expression.extraLocs['kind'])
                        : null;
                    range && liveRanges.push(range);

                    const endRange = n.expression.extraLocs['end'] ?
                        locToMonacoRange(n.expression.extraLocs['end'])
                        : null;
                    endRange && liveRanges.push(endRange);
                }
                if (n.expression.isReturn && n.expression.extraLocs) {
                    const returnLoc = {
                        start: {
                            line: n.expression.extraLocs.return.start.line,
                            column: n.expression.extraLocs.return.start.column
                        }
                        , end: {
                            line: n.expression.loc.start.line,
                            column: n.expression.loc.start.column,
                        }
                    };
                    const range = locToMonacoRange(returnLoc);
                    range && liveRanges.push(range);

                    const returnEndLoc = {
                        start: {
                            line: n.expression.loc.end.line,
                            column: n.expression.loc.end.column,
                        }
                        , end: {
                            line: n.expression.extraLocs.return.end.line,
                            column: n.expression.extraLocs.return.end.column
                        }
                    };
                    const rangeEnd = locToMonacoRange(returnEndLoc);
                    rangeEnd && liveRanges.push(rangeEnd);
                }


                //   widget.contentWidget.adjustWidth(true);
                // n.isError && console.log("highlightErrors", range);
                // n.isError && this.highlightErrors([range], ignoreRanges);

                const isOmitLabel = ([
                        'ArrowFunctionExpression',
                        'FunctionExpression',
                        'FunctionDeclaration'
                    ].includes(n.expressionType)
                    && tbm.branches.find(branch => branch.id === widget.id));

                const contentRef = createRef();
                const showTooltip = hasOwnTooltip(datum);
                liveWidgets.push({
                    contentRef,
                    n,
                    domNode: widget.contentWidget.domNode,
                    range,
                    configureLiveWidget: () =>
                        <Portal key={widget.id}
                                container={widget.contentWidget.domNode}>
                            {isOmitLabel ? null :
                                <ExplorerTooltip
                                    key={showTooltip}
                                    placement="bottom-start"
                                    {...(showTooltip ? {} : {open: false})}
                                    title={
                                        <ExplorerTooltipContainer>
                                            <LiveExpression
                                                entry={n.entry}
                                                // style={style}
                                                expressionId={widget.id}
                                                classes={classes}
                                                // widget={widget}
                                                isDatum={true}
                                                datum={datum}
                                                objectNodeRenderer={objectNodeRenderer}
                                            />
                                        </ExplorerTooltipContainer>
                                    }
                                >
                                    <div
                                        ref={contentRef}
                                        onMouseEnter={() => {
                                            // console.log(entry);
                                            highlightSingleText(
                                                n.loc, n.isError ?
                                                    MonacoHighlightTypes.error
                                                    : n.isGraphical ?
                                                        MonacoHighlightTypes.graphical
                                                        : MonacoHighlightTypes.text,
                                                traceSubscriber
                                                    .getMatches(
                                                        n.funcRefId,
                                                        n.dataRefId,
                                                        n.calleeId
                                                    ), false);
                                            handleCurrentContentWidgetId(widget.id);
                                        }}
                                        onMouseLeave={() => {
                                            highlightSingleText();
                                            handleCurrentContentWidgetId();
                                        }}
                                        // className=
                                        // {n.expressionType === 'CallExpression' ?
                                        // classes
                                        // .liveExpressionCallExpressionContainerUpdated
                                        // : liveExpressionContainerClassName}
                                        className={liveExpressionContainerClassName}
                                    >
                                        <OverflowComponent
                                            overflowXClassName={
                                                classes.liveExpressionRoot
                                            }
                                            contentClassName={
                                                classes.liveExpressionContent
                                            }
                                            disableOverflowDetectionY={true}
                                            contentAlign={isAlignLeft ?
                                                'left' : 'center'
                                            }
                                            overflowXAdornment={<MoreHorizIcon
                                                className={classes.overflowXIcon}/>}
                                            //  placeholder={
                                            //  <Typography>Yo</Typography>
                                            //  }
                                            //  placeholderClassName={
                                            //  classes.expressionCellContent
                                            //  }
                                            // placeholderDisableGutters={true}
                                        >
                                            {/*<div>{n.expressionType}</div>*/}
                                            {isOutput ?
                                                <GraphicalQuery
                                                    outputRefs={n.outputRefs}
                                                    visualIds={
                                                        getVisualIdsFromRefs(
                                                            n.outputRefs
                                                        )
                                                    }
                                                    selected={!!isSelected}
                                                />
                                                :
                                                <ObjectRootLabel
                                                    data={datum}
                                                    compact={true}
                                                    expressionType={n.expressionType}
                                                    iconify={isIcon}
                                                />
                                            }
                                        </OverflowComponent>
                                    </div>
                                </ExplorerTooltip>
                            }
                        </Portal>
                });
            }

        }
    }

    const liveExpresionDataInLines = {};
    const finalLiveWidgets = liveWidgets.reduce((result, data) => {
        const {range, configureLiveWidget} = data;
        const ignore = ignoreRanges.find(r => {
            return r.containsRange(range);
        });

        liveExpresionDataInLines[range.startLineNumber] =
            liveExpresionDataInLines[range.startLineNumber] || [];
        liveExpresionDataInLines[range.startLineNumber].push(data);

        if (!ignore) {
            result.push(() => configureLiveWidget());
        }
        return result;
    }, []);
    const onAdjustWidths = () => {
        Object.keys(liveExpresionDataInLines)
            .forEach(
                lineNumber => adjustWidth(liveExpresionDataInLines[lineNumber]
                )
            );
    };
    onAdjustWidths();
    setOnAdjustWidths(onAdjustWidths);

    const globalLiveRanges = (
        rangesRef.current[NavigationTypes.Global]?.liveRanges || defaultArray
    );
    const localLiveRanges = (
        rangesRef.current[NavigationTypes.Local]?.liveRanges || defaultArray
    );
    const globalIgnoreRanges = (
        rangesRef.current[NavigationTypes.Global]?.ignoreRanges || defaultArray
    );
    const localIgnoreRanges = (
        rangesRef.current[NavigationTypes.Local]?.ignoreRanges || defaultArray
    );
    // console.log("A");
    // useMemo(() => {
    //         console.log("B");
    unHighlightLiveExpressions();
    highlightLiveExpressions(
        [
            ...liveRanges,
            ...globalLiveRanges,
            ...localLiveRanges,
        ]
        , [
            ...ignoreRanges,
            ...globalIgnoreRanges,
            ...localIgnoreRanges,
        ]
        , navRanges
    );
    // }
    // , [
    //     highlightLiveExpressions,
    //     unHighlightLiveExpressions,
    //     liveRanges,
    //     globalLiveRanges,
    //     localLiveRanges,
    //     ignoreRanges,
    //     globalIgnoreRanges,
    //     localIgnoreRanges,
    //     navRanges,
    // ]);

    return <>
        {globalNavigators}
        {localNavigators}
        {liveExpressions}
        {finalLiveWidgets.map(cb => cb())}
        {visualIds}
    </>
});

const LazyTimelineNavigation = ({
                                    afterWidgetize,
                                    editorHeight,
                                    editorWidth,
                                    ...props
                                }) => {
    const {firecoPad, unHighlightLiveExpressions} = props;
    const [isProviderReady, setIsProviderReady] = useState(false);
    const [isProviderReadyInterval, setIsProviderReadyInterval] = useState(0);
    const style = useMemo(() => {
            const _style = {
                width: 'calc(100%)',
            };
            if (editorHeight && editorWidth) {
                _style.maxWidth = `${editorWidth}px`;
                _style.maxHeight = `${Math.ceil(editorHeight / 2)}px`;
            }
            return _style;
        },
        [editorHeight, editorWidth]
    );


    useEffect(() => {
            !!firecoPad
            && !isProviderReady
            && !isProviderReadyInterval
            && setIsProviderReadyInterval(
                setInterval(() => {
                    if (!!firecoPad?.liveExpressionWidgetProvider) {
                        firecoPad
                            .liveExpressionWidgetProvider
                            .afterWidgetize(afterWidgetize);
                        unHighlightLiveExpressions();
                        setIsProviderReady(true);
                    }
                }, 100)
            );

            isProviderReady
            && isProviderReadyInterval
            && setIsProviderReadyInterval(
                clearInterval(isProviderReadyInterval) || 0
            );

            return () => clearInterval(isProviderReadyInterval);
        }, [
            firecoPad, unHighlightLiveExpressions, afterWidgetize,
            isProviderReadyInterval, setIsProviderReadyInterval,
            isProviderReady, setIsProviderReady
        ]
    );

    return isProviderReady && <TimelineNavigation {...props} style={style}/>;
};

class LiveExpressionStore extends PureComponent {
    state = {
        autoLogger: null,
        decorators: [],
        hasDecoratorIdsChanged: false,
        timeline: [],
        currentContentWidgetId: null,
        // userBranches: [],
        branchSelections: {},
        // currentBranchId: null,
        // currentBranchTimelineId: null,
        // navigatorIndex: 0,
        // prevTimelineI: null,
        showLiveExpressions: true,
        updatingLiveExpressions: false,
        getLocationId: null,
    };
    rt = 100;
    currentEditorsTexts = null;
    didUpdate = true;
    refreshRate = 1000 / 10;
    refreshInterval = null;
    isBundling = false;
    bundlingError = null;


    prevLiveExpressionWidgets = {};
    liveExpressionWidgets = {};

    static getDerivedStateFromProps(nextProps, prevState) {
        // console.log('timeline', nextProps.timeline);
        if (nextProps.isNew && prevState.updatingLiveExpressions) {
            return {updatingLiveExpressions: false, branchSelections: {}};
        }
        return null;
    }

    configureLiveExpressionWidgetsLayoutChange(firecoPad) {
        const {monacoEditor} = firecoPad;
        const widgetLayoutChange = throttle(() => {
            if (this.timeline && this.timeline.length) {
                this.setState({updatingLiveExpressions: true});
                this.timeline = [];
                this.logs = [];
                this.refreshTimeline();
            }
        }, 100, {leading: true, trailing: true});

        monacoEditor.onDidScrollChange(throttle(() => {
            // this.setState({});
            if (this.state.currentContentWidgetId) {
                this.setState({currentContentWidgetId: null});
            }
        }, 100, {leading: true, trailing: true}));
        firecoPad.widgetLayoutChange = widgetLayoutChange;
    }

    handleCloseContentWidget = (ignore) => {
        if (ignore) {
            return;
        }
        this.setState({currentContentWidgetId: null});
    };
    handleCloseContentWidgetDebounced =
        debounce(this.handleCloseContentWidget, 1000);

    handleOpenContentWidget = (currentContentWidgetId) => {
        this.setState({currentContentWidgetId});
    };
    handleOpenContentWidgetDebounced =
        debounce(this.handleOpenContentWidget, 1000);

    handleCurrentContentWidgetId =
        (currentContentWidgetId, currentContentWidgetRange) => {
            const {handleFocusedLiveExpression} = this.props;
            if (currentContentWidgetId) {
                this.handleCloseContentWidgetDebounced(true);
                if (this.state.currentContentWidgetId) {
                    if (
                        currentContentWidgetId
                        !== this.state.currentContentWidgetId
                    ) {
                        this.handleOpenContentWidget(currentContentWidgetId);
                        handleFocusedLiveExpression
                        && handleFocusedLiveExpression(
                            currentContentWidgetId, currentContentWidgetRange
                        );
                    }
                } else {
                    this.handleOpenContentWidgetDebounced(
                        currentContentWidgetId
                    );
                }
            } else {
                // if (this.state.currentContentWidgetId) {
                this.handleCloseContentWidgetDebounced();
                // } else {
                //     this.handleCloseContentWidget();
                // }
            }
        };

    Navigators = (({
                       firecoPad,
                       navigationType,
                       _branches,
                       branched,
                       absoluteBranched,
                       // currentBranched,
                       color,
                       classes,
                       style,
                       liveExpressionContainerClassName,
                       // liveRanges,
                       // ignoreRanges,
                       locationMap,
                       decorators,
                       branchSelections,
                       currentContentWidgetId,
                       // navigatorWidgetIds = {},
                       rangesRef = {current: {}},
                   }) => {

        rangesRef.current[navigationType] = {
            liveRanges: [],
            ignoreRanges: [],
        };
        const {
            liveRanges,
            ignoreRanges,
        } = rangesRef.current[navigationType];
        const locToMonacoRange =
            firecoPad.liveExpressionWidgetProvider.locToMonacoRange;

        const {
            /*currentBranchId,*/ currentBranchTimelineId, navigatorIndex,
            /*prevTimelineI,*/
        } = (branchSelections[navigationType] || {});

        this.prevbranches = _branches;
        const branches = _branches;
        const navigators = [];
        const liveExpressions = [];
        for (const id in branched) {
            // console.log('branched', branched);

            const decorator = (decorators || []).find(dec => dec.id === id);
            if (decorator?.contentWidget) {
                //  const {datum, widget} = this.prevLiveExpressionWidgets[i];
                //   console.log('bn', decorator);
                // console.log(id, branched[id])
                //decorator.contentWidget.adjustWidth(true, true);
                const isSelected = currentContentWidgetId === id;
                // const branchIndex = branched[id]
                //     .indexOf(currentBranchTimelineId);
                // const branchSelection =
                // currentBranched && currentBranched[id] ?
                //     currentBranched[id].length
                //     : branched[id].length; //branchIndex >= 0 ?
                //     branchIndex :
                const branchTotal =
                    absoluteBranched?.[id]?.length || branched?.[id]?.length;
                // const branchLabel = `${branchSelection}/${branchTotal}`;

                // console.log(`${branchSelection}/${branchTotal}`)
                const branchNavigatorWidgetClassName =
                    classes.branchNavigatorWidget;
                const n = currentBranchTimelineId ?
                    this.timeline[
                    this.timeline.length - currentBranchTimelineId
                        ] || {} : {};
                const branch = (branches || []).find(b => b.id === id);
                //console.log('PF-', branch, locationMap[id], !!branch?.expression);
                if (branch?.expression && !branch.expression.extraLocs) {
                    const location = locationMap[id];
                    if (location?.extraLocs) {
                        branch.expression.extraLocs = location.extraLocs;
                        // console.log(
                        // 'PF-',
                        // branch === branched[id], branch, branched[id]
                        // );
                    }
                }
                //console.log(
                // 'PF-', branch === branched[id], branch, branched[id]
                // );
                let isE = false;

                if (branch.expression.extraLocs?.isException) {
                    const tryLocs = branch.expression.extraLocs.tryLocs;
                    if (tryLocs) {
                        switch (branch.expression.extraLocs.name) {
                            case 'block':
                                this.getTryBlockLocs(tryLocs).forEach(
                                    loc => {
                                        const range = locToMonacoRange(loc);
                                        range && liveRanges.push(range);
                                    }
                                );

                                break;

                            case 'finalizer':
                                this.getTryFinalizerLocs(tryLocs).forEach(
                                    loc => {
                                        const range = locToMonacoRange(loc);
                                        range && liveRanges.push(range);
                                    }
                                );

                                break;
                            default:// handler
                                // console.log('h', branch);
                                this.getTryBlockLocs(tryLocs).forEach(
                                    loc => {
                                        const range = locToMonacoRange(loc);
                                        const index = range
                                            && liveRanges.findIndex(
                                                r => r.equalsRange(range)
                                            );
                                        index >= 0
                                        && liveRanges.splice(index, 1);
                                    }
                                );

                                this.getTryHandlerLocs(tryLocs).forEach(
                                    loc => {
                                        const range = locToMonacoRange(loc);
                                        range && liveRanges.push(range);
                                    }
                                );
                                isE = true;
                        }
                        if (!isE) {
                            continue;
                        }
                    }
                }
                // if (color === 'secondary') {
                // console.log('lo',
                // branch, decorator,
                // this.timeline[this.timeline.length
                // - currentBranchTimelineId], branched[id]);
                // }
                // if(branch.expression.expressionType === 'IfStatement'){
                //     console.log('cont', branch);
                // }
                // console.log("branch.expression",
                //     branch.expression,
                //     branch.expression?.expressionType,
                //     branch.expression?.extraLocs,
                //     );
                if (branch && branch.expression &&
                    branch.expression.expressionType !== 'IfStatement'
                    && branch.expression.extraLocs
                    && (branch.expression.extraLocs.signature ||
                        branch.expression.extraLocs.test)) {
                    if (branch.expression.extraLocs.signature) {
                        // (branch.expression.extraLocs.signature.start.line
                        // === 1) &&
                        // console.log("L1",
                        // branch.expression.extraLocs.signature)
                        const controlLParLoc = {
                            start: {
                                line: branch
                                    .expression
                                    .extraLocs.signature.start.line,
                                column: branch
                                    .expression
                                    .extraLocs.signature.start.column,
                            },
                            end: {
                                line: branch.expression.blockLoc.start.line,
                                column: branch
                                    .expression.blockLoc.start.column + 1,
                            }
                        };
                        const controlLParRange =
                            locToMonacoRange(controlLParLoc);
                        liveRanges.push(controlLParRange);

                        const controlRParLoc = {
                            start: {
                                line: branch.expression.blockLoc.end.line,
                                column: branch
                                    .expression.blockLoc.end.column - 1,
                            },
                            end: {
                                line: branch.expression.blockLoc.end.line,
                                column: branch
                                    .expression.blockLoc.end.column,
                            }
                        };
                        const controlRParRange =
                            locToMonacoRange(controlRParLoc);
                        liveRanges.push(controlRParRange);
                    }

                    if (branch.expression.extraLocs.test) {
                        // console.log('>TE', branch);
                        const controlLParLoc = {
                            start: {
                                line: branch.expression.loc.start.line,
                                column: branch.expression.loc.start.column,
                            },
                            end: {
                                line: branch
                                    .expression.extraLocs.test.start.line,
                                column: branch
                                    .expression.extraLocs.test.start.column,
                            }
                        };
                        const controlLParRange =
                            locToMonacoRange(controlLParLoc);
                        liveRanges.push(controlLParRange);

                        const controlRParLoc = {
                            start: {
                                line: branch
                                    .expression.extraLocs.test.end.line,
                                column: branch
                                    .expression.extraLocs.test.end.column,
                            },
                            end: {
                                line: branch.expression.blockLoc.start.line,
                                column: branch
                                    .expression.blockLoc.start.column + 1,
                            }
                        };
                        const controlRParRange =
                            locToMonacoRange(controlRParLoc);
                        liveRanges.push(controlRParRange);

                        const controlEndLoc = {
                            start: {
                                line: branch.expression.blockLoc.end.line,
                                column: branch
                                    .expression.blockLoc.end.column - 1,
                            },
                            end: {
                                line: branch.expression.blockLoc.end.line,
                                column: branch
                                    .expression.blockLoc.end.column,
                            }
                        };
                        const controlEndRange =
                            locToMonacoRange(controlEndLoc);
                        liveRanges.push(controlEndRange);
                        // console.log(
                        //     'while ranges',
                        //     controlLParLoc,
                        //     controlRParRange, controlEndRange
                        // );
                    }
                }


                if (branch && branch.type === 'IfStatement' &&
                    branch.expression?.extraLocs?.test) {
                    // console.log('>IF', branch);
                    //{start:{line:0, column:0}, end:{line:0, column:0}};
                    // const controlLParLoc = {
                    //     start: {
                    //         line: branch.expression.loc.start.line,
                    //         column: branch.expression.loc.start.column,
                    //     },
                    //     end: {
                    //         line: branch
                    //             .expression.extraLocs.test.start.line,
                    //         column: branch
                    //             .expression.extraLocs.test.start.column,
                    //     }
                    // };
                    // // const controlLParRange =
                    // //     locToMonacoRange(controlLParLoc);
                    // // //  liveRanges.push(controlLParRange);
                    //
                    // const controlRParLoc = {
                    //     start: {
                    //         line: branch
                    //             .expression.extraLocs.test.end.line,
                    //         column: branch
                    //             .expression.extraLocs.test.end.column,
                    //     },
                    //     end: {
                    //         line: branch.expression.extraLocs.test.end.line,
                    //         column: branch
                    //             .expression.extraLocs.test.end.column + 1,
                    //     }
                    // };
                    // const controlRParRange =
                    //     locToMonacoRange(controlRParLoc);
                    //    liveRanges.push(controlRParRange);
                    // fix do while
                    // if (branch.type === 'IfStatement') {
                    //     const ignoreName =
                    //         branch.blockName === 'consequent' ?
                    //             'alternate' : 'consequent';
                    //     // const range =
                    //     //     branch.expression.extraLocs[ignoreName] ?
                    //     //         locToMonacoRange(
                    //     //             branch
                    //     //             .expression.extraLocs[ignoreName]
                    //     //         ) : null;
                    //     //  console.log('control:',
                    //     // branch.blockName,
                    //     // 'ommitting', ignoreName,
                    //     // branch.expression.extraLocs, range,);
                    //     //  range && ignoreRanges.push(range);
                    // }

                    if (/*branch.type === 'IfStatement' && */
                        (branch.blockName === 'alternate')) {
                        // const controlRParLoc = {
                        //     start: {
                        //         line: branch
                        //             .expression.extraLocs.test.end.line,
                        //         column: branch
                        //             .expression.extraLocs.test.end.column + 1,
                        //     },
                        //     end: {
                        //         line: branch
                        //             .expression
                        //             .extraLocs.consequent.end.line,
                        //         column: branch
                        //             .expression
                        //             .extraLocs.consequent.end.column,
                        //     }
                        // };
                        // const controlRParRange =
                        //     locToMonacoRange(controlRParLoc);
                        //   liveRanges.push(controlRParRange);

                        // const controlOpenBracketLoc = {
                        //     start: {
                        //         line:
                        //         branch
                        //             .expression
                        //             .extraLocs.consequent.end.line,
                        //         column:
                        //         branch
                        //             .expression
                        //             .extraLocs.consequent.end.column,
                        //     },
                        //     end: {
                        //         line:
                        //         branch
                        //             .expression
                        //             .extraLocs.alternate.end.line,
                        //         column: branch
                        //             .expression
                        //             .extraLocs.alternate.end.column + 1,
                        //     }
                        // };
                        // const controlOpenBracketRange =
                        //     locToMonacoRange(controlOpenBracketLoc);
                        // //  liveRanges.push(controlOpenBracketRange);

                        // const controlCloseBracketLoc = {
                        //     start: {
                        //         line: branch.expression.loc.end.line,
                        //         column: branch.expression.loc.end.column,
                        //     },
                        //     end: {
                        //         line: branch.expression.loc.end.line,
                        //         column: branch.expression.loc.end.column + 1,
                        //     }
                        // };
                        // const controlCloseBracketRange =
                        //     locToMonacoRange(controlCloseBracketLoc);
                        // //   liveRanges.push(controlCloseBracketRange);


                    } else {
                        if (branch.type !== 'DoWhileStatement') {
                            // const content =
                            //     branch.type === 'IfStatement'
                            //         ? 'consequent' : 'body';
                            // const controlRParOpenBracketLoc = {
                            //     start: {
                            //         line:
                            //         branch
                            //             .expression.extraLocs.test.end.line,
                            //         column:
                            //             branch
                            //                 .expression
                            //                 .extraLocs.test.end.column + 1,
                            //     },
                            //     end: {
                            //         line:
                            //         branch
                            //             .expression
                            //             .extraLocs[content].start.line,
                            //         column:
                            //         branch
                            //             .expression
                            //             .extraLocs[content].start.column,
                            //     }
                            // };
                            // const controlRParOpenBracketRange =
                            //     locToMonacoRange(
                            //     controlRParOpenBracketLoc
                            //     );
                            // //  liveRanges.push(
                            // controlRParOpenBracketRange
                            // );

                        }
                    }


                    // branch.expression.
// console.log('loce', branch.expression.extraLocs[branch.blockName]);
//                         const locO = branch
//                             .expression.extraLocs[branch.blockName] ? {
//                             start: {
//                                 line: branch
//                                     .expression
//                                     .extraLocs[branch.blockName].start.line,
//                                 column: branch
//                                     .expression
//                                     .extraLocs[branch.blockName].start.column,
//                             },
//                             end: {
//                                 line: branch
//                                     .expression
//                                     .extraLocs[branch.blockName].start.line,
//                                 column: branch
//                                     .expression
//                                     .extraLocs[
//                                         branch.blockName
//                                     ].start.column + 1,
//                             }
//                         } : null;
                    // const rangeO = locO ? locToMonacoRange(locO) : null;
                    // rangeO && liveRanges.push(rangeO);
                    // const locC = branch.expression.extraLocs[branch.blockName] ? {
                    //     start: {
                    //         line: branch.expression.extraLocs[branch.blockName].end.line,
                    //         column: branch.expression.extraLocs[branch.blockName].end.column ?
                    //             branch.expression.extraLocs[branch.blockName].end.column - 1
                    //             : branch.expression.extraLocs[branch.blockName].end.column,
                    //     },
                    //     end: {
                    //         line: branch.expression.extraLocs[branch.blockName].end.line,
                    //         column: branch.expression.extraLocs[branch.blockName].end.column,
                    //     }
                    // } : null;
                    // const rangeC = locC ? locToMonacoRange(locC) : null;
                    //    rangeC && liveRanges.push(rangeC);
                    // console.log(branch.expression.extraLocs,
                    // branch.blockName, branch.expression.extraLocs[branch.blockName]);
                    //     this.highlightBranch(NavigationTypes.Local,
                    // branch.expression.extraLocs[branch.blockName])
                    //   : this.highlightBranch(NavigationTypes.Local);

                } else {

                    if (!isE) {
                        const Navigator = this.Navigator;
                        navigators.push(<Navigator
                            isSelected={isSelected}
                            key={id}
                            navigationType={navigationType}
                            id={id}
                            container={decorator.contentWidget.domNode}
                            objectNodeRenderer={this.objectNodeRenderer}
                            data={branched[id]}
                            widget={decorator}
                            navigatorIndex={navigatorIndex}
                            branchTotal={branchTotal}
                            classes={classes}
                            style={style}
                            color={color}
                            branchNavigatorWidgetClassName={branchNavigatorWidgetClassName}
                        />);

                    } else {
                        liveExpressions.push((
                            <Portal
                                key={id}
                                container={decorator.contentWidget.domNode}>
                                <div
                                    // style={console.log('n.isError', n.isError) || n.isError ? {
                                    //     zIndex: 9999,
                                    //     color: 'red'
                                    // } : {}}
                                    onMouseEnter={() => {
                                        // console.log(n);
                                        this.highlightSingleText(
                                            n.loc, n.isError ? MonacoHighlightTypes.error
                                                : n.isGraphical ?
                                                    MonacoHighlightTypes.graphical : MonacoHighlightTypes.text,
                                            this.traceSubscriber
                                                .getMatches(n.funcRefId, n.dataRefId, n.calleeId), false);
                                        this.handleCurrentContentWidgetId(id, n.range);
                                    }}
                                    onMouseLeave={() => {
                                        this.highlightSingleText();
                                        this.handleCurrentContentWidgetId();
                                    }}
                                    className={liveExpressionContainerClassName}
                                >
                                    <ObjectRootLabel
                                        data={branch?.e?.data}
                                        compact={true}
                                        expressionType={n.expressionType}
                                        iconify={false}
                                    />
                                </div>
                            </Portal>
                        ));

                    }
                }
            }

        }
        return <>{navigators}{liveExpressions}</>;
    });

    getTryBlockLocs = (tryLocs) => {
        const lParLoc = {
            start: {
                line: tryLocs.loc.start.line,
                column: tryLocs.loc.start.column,
            },
            end: {
                line: tryLocs.extraLocs.block.blockLoc.start.line,
                column: tryLocs.extraLocs.block.blockLoc.start.column + 1,
            }
        };
        const rParLoc = {
            start: {
                line: tryLocs.extraLocs.block.blockLoc.end.line,
                column: tryLocs.extraLocs.block.blockLoc.end.column - 1,
            },
            end: {
                line: tryLocs.extraLocs.block.blockLoc.end.line,
                column: tryLocs.extraLocs.block.blockLoc.end.column,
            }
        };
        return [lParLoc, rParLoc];
    };
    getTryHandlerLocs = (tryLocs) => {
        const lParLoc = {
            start: {
                line: tryLocs.extraLocs.block.blockLoc.end.line,
                column: tryLocs.extraLocs.block.blockLoc.end.column,
            },
            end: {
                line: tryLocs.extraLocs.handler.blockLoc.start.line,
                column: tryLocs.extraLocs.handler.blockLoc.start.column + 1,
            }
        };
        const rParLoc = {
            start: {
                line: tryLocs.extraLocs.handler.blockLoc.end.line,
                column: tryLocs.extraLocs.handler.blockLoc.end.column - 1,
            },
            end: {
                line: tryLocs.extraLocs.handler.blockLoc.end.line,
                column: tryLocs.extraLocs.handler.blockLoc.end.column,
            }
        };
        return [lParLoc, rParLoc];
    };

    getTryFinalizerLocs = (tryLocs) => {
        const prev = tryLocs.extraLocs.handler || tryLocs.extraLocs.block;
        const lParLoc = {
            start: {
                line: prev.blockLoc.end.line,
                column: prev.blockLoc.end.column,
            },
            end: {
                line: tryLocs.extraLocs.finalizer.blockLoc.start.line,
                column: tryLocs.extraLocs.finalizer.blockLoc.start.column + 1,
            }
        };
        const rParLoc = {
            start: {
                line: tryLocs.extraLocs.finalizer.blockLoc.end.line,
                column: tryLocs.extraLocs.finalizer.blockLoc.end.column - 1,
            },
            end: {
                line: tryLocs.extraLocs.finalizer.blockLoc.end.line,
                column: tryLocs.extraLocs.finalizer.blockLoc.end.column,
            }
        };
        return [lParLoc, rParLoc];
    };

    handleBranchChange = (
        navigationType,
        currentBranchId,
        currentBranchTimelineId,
        navigatorIndex,
        prevTimelineI,
    ) => {
        this.setState((prevState) => {
            let {branchSelections} = prevState;
            const globalB = (
                branchSelections[NavigationTypes.Global] || {}
            );
            const globalCurrentBranchId = globalB.currentBranchId;
            branchSelections = {
                ...branchSelections, [navigationType]: {
                    currentBranchId,
                    currentBranchTimelineId,
                    navigatorIndex,
                    prevTimelineI,
                    globalCurrentBranchId,
                }
            };

            if (globalCurrentBranchId
                && branchSelections[
                    NavigationTypes.Local
                    ]?.globalCurrentBranchId !== globalCurrentBranchId) {
                branchSelections[NavigationTypes.Local] = null;
            }
            return {branchSelections};
        });
    };

    Navigator = ({
                     navigationType,
                     id,
                     container,
                     objectNodeRenderer,
                     data,
                     widget,
                     navigatorIndex,
                     branchTotal,
                     classes,
                     style,
                     color,
                     branchNavigatorWidgetClassName,
                     // isSelected,
                 }) => {
        const ref = useRef();
        const handleChange = useCallback(
            (timelineI, navigatorIndex, prevTimelineI) =>
                this.handleBranchChange(
                    navigationType, id,
                    timelineI, navigatorIndex, prevTimelineI
                ),
            [navigationType, id]
        );
        const sliderRange = useMemo(() => [navigatorIndex || branchTotal]
            , [
                navigatorIndex,
                branchTotal,
            ]
        );


        // useEffect(() => {
        //     const afterRenderChildren =
        //         setTimeout(() => {
        //             // console.log(decorator.contentWidget.domNode, ref);
        //             if (!ref.current) {
        //                 return;
        //             }
        //             // const width = ref
        //             //     .current.getBoundingClientRect().width;
        //             // decorator
        //             //     .contentWidget
        //             //     .domNode.style
        //             //     .marginRight = `${width + 2}px`;
        //             // console.log(width, decorator.contentWidget.domNode, ref.current);
        //         }, 0);
        //
        //     return () => clearTimeout(
        //         afterRenderChildren
        //     );
        // }, []);
        // isSelected &&
        // let isSelected = true;
        // console.log(decorator.contentWidget.domNode, isSelected);
        //{...(isSelected ? {open: true} : {disableInteractive:true})}
        const showNavigatorTooltip = branchTotal > 1;
        return (
            <Portal
                container={container}>
                <NavigatorTooltip
                    key={showNavigatorTooltip}
                    title={
                        <LiveExpression
                            style={style}
                            color={color}
                            expressionId={id}
                            classes={classes}
                            widget={widget}
                            data={data}
                            objectNodeRenderer={objectNodeRenderer}
                            sliderRange={sliderRange}
                            branchNavigatorChange={handleChange}
                        />
                    }
                    placement="top-start"
                    {...(showNavigatorTooltip ? {arrow: true} : {open: false})}
                    enterDelay={500}
                    leaveDelay={500}
                >
                    <Button
                        ref={ref}
                        variant="contained"
                        color={color}
                        className={branchNavigatorWidgetClassName}
                    >
                        <span
                            className={classes.navigatorLabelIndex}
                        >
                            {navigatorIndex || branchTotal}
                        </span>
                        <span
                            className={classes.navigatorLabelTotal}
                        >
                            /{branchTotal}
                        </span>
                    </Button>
                </NavigatorTooltip>
            </Portal>

        );
    };

    findFuncRefs(timeline, branches) {
        let branchSource = null, startIndex = 0;
        // console.log(timeline, branches);
        branches.forEach(branch => {
            if (branchSource) {
                // console.log(branchSource.loc.start.line, 'range', startIndex, branch.timeline);

                // timeline.reduce((r, e, i)=>((i>startIndex&& i<= branch.timelineI)?((r.push(e)|| true)&& r):r), []).forEach(
                //     entry=>{
                //         if(entry &&entry.type === 'AssignmentExpression'){
                //                     // console.log(entry);
                //                 }
                //     }
                // );
                for (let i = timeline.length - startIndex; i > timeline.length - branch.timelineI; i--) {

                    if (timeline[i] && timeline[i].type === 'AssignmentExpression') {
                        if (timeline[i].objectClassName === 'function') {
                            //      console.log(timeline[i]);
                            //   console.log('other refs', timeline.filter(t => t.value === timeline[i].value));
                        }

                    }
                }
            }
            branchSource = branch;
            startIndex = branch.timelineI;
        });
    }

    setOnAdjustWidths = (onAdjustWidths) => {
        this.onAdjustWidths = onAdjustWidths;
    }

    adjustWidth = (liveExpresionDataInLineRaw) => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        const liveExpresionDataInLine = liveExpresionDataInLineRaw.sort((a, b) => {
            const aRange = a.range, bRange = b.range;
            if (aRange && bRange && aRange !== bRange) {
                if (aRange.containsRange(bRange)) {
                    if (aRange.equalsRange()) {
                        return 0;
                    } else {
                        return 1;
                    }
                } else {
                    if (aRange.startColumn < bRange.startColumn) {
                        return -1;
                    } else {
                        if (aRange.startColumn > bRange.startColumn) {
                            return 1;
                        } else {
                            return 0;
                        }
                    }
                }
            }
            return 0;
        });

        // class OffsetModel {
        //     constructor(
        //     lineNumber, el, align, startOffset,
        //     endOffset, marginLeft, maxWidth
        //     ) {
        //
        //     }
        //
        //     isOccluding() {
        //
        //     }
        //
        //     conciliate() {
        //
        //     }
        // }
        //
        // const offsetModels = [];

        const toReAdjust = [];
        const toReAdjustRight = [];
        const rightAdjustables = [];
        liveExpresionDataInLine.forEach(i => {
            if (i.domNode.dataset.isError) {
                i.domNode.style["z-index"] = '9999';
                i.domNode.style["margin-left"] = '0px';
                i.domNode.style["max-width"] = '100%';
                i.domNode.style["overflow"] = 'visible';
                return;
            } else {
                i.domNode.style["z-index"] = 'unset';
                i.domNode.style["max-width"] = 'unset';
                i.domNode.style["overflow"] = 'hidden';
            }
            let isIVisible = true, marginLeft = 0, isAlignRight = false;
            if (i.domNode.offsetParent === null) {
                isIVisible = false;
                if (i.domNode.dataset.marginLeft) {
                    marginLeft = parseFloat(i.domNode.dataset.marginLeft || '0');
                } else {
                    return;
                }
            }
            if (i.n.expressionType === 'CallExpression' && !isFunction(i.n.value)) {
                isAlignRight = true;

                marginLeft = isIVisible ?
                    firecoPad
                        .monacoEditor
                        .getOffsetForColumn(
                            i.range.endLineNumber, i.range.endColumn)
                    - firecoPad
                        .monacoEditor
                        .getOffsetForColumn(i.range.startLineNumber, i.range.startColumn)
                    : marginLeft;
                i.domNode.style.marginLeft = `${marginLeft - 7}px`;
                i.domNode.dataset.marginLeft = `${marginLeft}`;
                i.domNode.dataset.isAlignRight = 'true';
                toReAdjust.push(i.domNode);
                toReAdjustRight.push(i.domNode);
            } else {
                if (i.n.expressionType === 'AssignmentExpression'
                    || i.n.expressionType === 'ReturnStatement'
                    || ((i.n.expressionType === 'CallExpression'
                        || i.n.expressionType === 'MemberExpression') && isFunction(i.n.value))
                    || i.n.expressionType === 'VariableDeclarator') {
                    i.domNode.style.maxWidth = '0px';
                    i.domNode.dataset.maxWidth = '0';
                    return;
                }

            }

            !isAlignRight && rightAdjustables.push(i.domNode);


            let leftBound = null;
            let marginBound = null;
            liveExpresionDataInLine.forEach(j => {

                if (j.n.expressionType === 'AssignmentExpression'
                    || j.n.expressionType === 'ReturnStatement'
                    || ((j.n.expressionType === 'CallExpression' || j.n.expressionType === 'MemberExpression')
                        && isFunction(j.n.value))
                    || j.n.expressionType === 'VariableDeclarator') {
                    return;
                }

                if (i.range !== j.range) {

                    if (!(j.range.containsRange(i.range) || i.range.containsRange(j.range))) {
                        if (i.range.startLineNumber === i.range.endLineNumber
                            && i.range.endLineNumber === j.range.endLineNumber) {
                            if (i.range.endColumn <= j.range.startColumn) {
                                if (leftBound) {
                                    if (j.range.startColumn <= leftBound.range.startColumn) {
                                        leftBound = j;
                                    }
                                } else {
                                    leftBound = j;
                                }
                            }
                        }

                    } else {
                        if (j.range.containsRange(i.range) && i.range.startLineNumber === i.range.endLineNumber
                            && i.range.startColumn === j.range.startColumn
                            && i.range.endLineNumber === j.range.endLineNumber) {
                            if (marginBound) {
                                if (marginBound.range.containsRange(j.range)) {
                                    marginBound = j;
                                }
                            } else {
                                marginBound = j;
                            }
                        }
                    }
                }
            });
            let leftBoundWidth = 0;

            if (leftBound && (leftBound.domNode.offsetParent !== null || i.domNode.dataset.maxWidth)) {
                leftBoundWidth = leftBound.domNode.offsetParent !== null ?
                    firecoPad
                        .monacoEditor
                        .getOffsetForColumn(
                            leftBound.range.startLineNumber, leftBound.range.startColumn)
                    - firecoPad
                        .monacoEditor
                        .getOffsetForColumn(i.range.startLineNumber, i.range.startColumn)
                    : i.domNode.dataset.maxWidth;
                i.domNode.style.maxWidth = `${leftBoundWidth - 7}px`;
                i.domNode.dataset.maxWidth = `${leftBoundWidth}`;
                toReAdjust.push(i.domNode);
            }

            if (marginBound) {
                if (!isAlignRight && !marginBound.domNode.dataset.isAlignRight) {
                    marginLeft = leftBoundWidth || isIVisible ?
                        firecoPad
                            .monacoEditor
                            .getOffsetForColumn(
                                i.range.endLineNumber, i.range.endColumn)
                        - firecoPad
                            .monacoEditor
                            .getOffsetForColumn(i.range.startLineNumber, i.range.startColumn)
                        : marginBound.domNode.dataset.marginLeft;

                    marginBound.domNode.style.marginLeft = `${marginLeft + 7}px`;
                    marginBound.domNode.dataset.marginLeft = `${marginLeft}`;
                    i.domNode.style.maxWidth = `${marginLeft}px`;
                    i.domNode.dataset.maxWidth = `${marginLeft}`;
                    toReAdjust.push(i.domNode);
                    toReAdjust.push(marginBound.domNode);
                } else {

                }
            }

        });
        // toReAdjust.forEach((nodeI, i) => {
        //     for (let j = i; j < toReAdjust.length; j++) {
        //         // const nodeJ = toReAdjust[j];
        //         // const iStart = nodeI.dataset.isAlignRight?parseFloat(nodeI.style.marginLeft)
        //         // if(){
        //         //
        //         // }
        //     }
        // });
        // let prevIDomNode = null;
        toReAdjustRight.forEach(iDomNode => {
            const iRect = iDomNode.getBoundingClientRect();
            // const marginLeft = iDomNode.style.marginLeft ?
            //     parseFloat(iDomNode.style.marginLeft.replace('px', '')) : 0;
            const elemX = iRect.x;

            // console.log('overlap',marginLeft, elemX);
            rightAdjustables.forEach(jDomNode => {
                const jRect = jDomNode.getBoundingClientRect();

                if (jRect.x <= elemX && elemX <= jRect.x + jRect.width) {
                    jDomNode.style.maxWidth = `${iRect.x - jRect.x}px`;
                    // console.log('overlap', iDomNode, jDomNode, jDomNode.style.maxWidth);

                } else {
                    // if (iRect.x <= jRect.x && jRect.x <= iRect.x + iRect.width) {
                    //     iDomNode.style.maxWidth = `${jRect.x - iRect.x}px`;
                    //     console.log('overlap', iDomNode, jDomNode, jDomNode.style.maxWidth);
                    //
                    // }
                }

            });

            // if (prevIDomNode) {
            //     const jRect = prevIDomNode.getBoundingClientRect();
            //     const jMarginLeft = prevIDomNode.style.marginLeft ?
            //         parseFloat(prevIDomNode.style.marginLeft.replace('px', ''))
            //         : 0;
            //     const prevElemX = jRect.x + jMarginLeft;
            //
            //     if (prevElemX <= elemX && elemX <= prevElemX + jRect.width) {
            //         prevIDomNode.style.maxWidth = `${elemX - prevElemX}px`;
            //         // console.log('overlap', iDomNode, prevIDomNode, prevIDomNode.style.maxWidth, prevIDomNode.style.marginLeft);
            //     }
            //
            // }
            // prevIDomNode = iDomNode;

        });

        // console.log('RE', toReAdjust);
    };

    render() {
        const {
            classes,
            editorWidth,
            editorHeight,
            timeline,
            searchState,
            firecoPad,
            isAutoLogActive,
            VisualQueryManager,
        } = this.props;
        const {getLocationId} = this.state;
        if (!isAutoLogActive) {
            return null;
        }
        const {
            decorators, currentContentWidgetId, updatingLiveExpressions,
            branchSelections,
        } = this.state;

        const liveExpressionContainerClassName = updatingLiveExpressions ?
            classes.liveExpressionContainerUpdating
            : classes.liveExpressionContainerUpdated;

        const {
            currentBranchId, currentBranchTimelineId,
            /*navigatorIndex,*/ prevTimelineI,
        } = (
            branchSelections[NavigationTypes.Local]
            || branchSelections[NavigationTypes.Global]
            || {}
        );
        //todo: pass all baranchSelections to Branch Manager

        // const lee =
        // document.querySelectorAll(`.${defaultExpressionClassName}`);
        // if(firecoPad){
        //     const {monacoEditor} = firecoPad;
        //     if(monacoEditor){
        //         const res =monacoEditor
        //             .getModel()
        //             .getAllDecorations()
        //             .filter(
        //             dec=>dec.options.inlineClassName
        //             .includes(defaultExpressionClassName)
        //             )
        //         .map(dec=>dec.id);
        //         monacoEditor.deltaDecorations(res, []);
        //         console.log('decs', res);
        //     }
        // }


        // this.unHighlightErrors();
        // this.unHighlightBranches();

        this.prevLiveExpressionWidgets = this.liveExpressionWidgets;


        const navProps = {
            VisualQueryManager,
            editorWidth,
            editorHeight,
            afterWidgetize: this.afterWidgetize,
            getLocationId,
            firecoPad,
            branchSelections,
            timeline,
            prevTimelineI,
            currentBranchId,
            currentBranchTimelineId,
            classes,
            liveExpressionContainerClassName,
            decorators,
            currentContentWidgetId,
            searchState,
            traceSubscriber: this.traceSubscriber,
            locationMap: this.locationMap,
            Navigators: this.Navigators,
            highlightLiveExpressions: this.highlightLiveExpressions,
            unHighlightLiveExpressions: this.unHighlightLiveExpressions,
            getGoToTimelineBranch: this.getGoToTimelineBranch,
            handleBranchChange: this.handleBranchChange,
            objectNodeRenderer: this.objectNodeRenderer,
            highlightSingleText: this.highlightSingleText,
            handleCurrentContentWidgetId: this.handleCurrentContentWidgetId,
            adjustWidth: this.adjustWidth,
            setOnAdjustWidths: this.setOnAdjustWidths,
            highlightErrors: this.highlightErrors,
        };
        return (<LazyTimelineNavigation {...navProps}/>);
    }

    updateLiveExpressionWidgetWidths = () => {
        clearTimeout(this.onAdjustWidthsTimeout);
        this.onAdjustWidths
        && (this.onAdjustWidthsTimeout = setTimeout(this.onAdjustWidths, 10));
    };

    shouldBundle = (editorsTexts) => {
        if (!isEqual(this.currentEditorsTexts, editorsTexts)) {
            if (editorsTexts) {
                const {editorIds} = this.props;
                for (const editorId in editorIds) {
                    if (!isString(editorsTexts[editorIds[editorId]])) {
                        return false;
                    }
                }
                this.currentEditorsTexts = editorsTexts;
                return true;
            }
        }
        return false;
    };


    getGoToTimelineBranch = (
        timeline, timelineBranchManager, handleBranchChange
    ) => (
        entry
    ) => {
        const timelineI = entry ? entry.i : -1;

        if (entry && timelineI > -1 && timelineBranchManager) {
            const branchResult =
                timelineBranchManager.getBranchByTimelineI(timelineI);
            const {
                branch, isGlobal, navigatorIndex, prevTimelineI
            } = branchResult;
            if (branch) {
                console.log(
                    'tri',
                    branch,
                    isGlobal,
                    timelineI,
                    navigatorIndex,
                    prevTimelineI
                );
                handleBranchChange(
                    isGlobal ? NavigationTypes.Global : NavigationTypes.Local,
                    entry.id,
                    timelineI,
                    navigatorIndex,
                    prevTimelineI
                );
            }

        }
    };


    componentDidMount() {
        const {updateLiveExpressionWidgetWidths} = this.props
        updateLiveExpressionWidgetWidths
        && updateLiveExpressionWidgetWidths(
            this.updateLiveExpressionWidgetWidths
        );
    }

    componentDidUpdate(prevProps/*, prevState, snapshot*/) {
        this.didUpdate = true;

        const {
            autorunDelay = 0, firecoPad, editorsTexts, updateBundle
        } = this.props;
        const {/*, decorators*/ getLocationId} = this.state;

        if (firecoPad && firecoPad !== prevProps.firecoPad) {
            this.configureLiveExpressionWidgetsLayoutChange(firecoPad);
        }

        if (!firecoPad || !firecoPad.astResult || !getLocationId) {
            return;
        }

        if (!firecoPad.astResult.ast
            && firecoPad.astResult.ast !== prevProps.firecoPad.astResult.ast) {
            updateBundleFailure({js: firecoPad.astResult.astError});
            return;
        }

        if (this.shouldBundle(editorsTexts)) {
            clearInterval(this.refreshInterval);
            this.timeline = [];
            updateBundle();
            clearTimeout(this.updateBundleTimeout);
            this.updateBundleTimeout = setTimeout(
                () => this.updateBundle(this.currentEditorsTexts)
                , autorunDelay
            );

        }

    }

    componentWillUnmount() {
        const {updateLiveExpressionWidgetWidths} = this.props
        updateLiveExpressionWidgetWidths
        && updateLiveExpressionWidgetWidths(null);

        goToTimelineBranch = goToTimelineBranchInactive;
    }

    updateBundle = (currentEditorsTexts) => {
        const {
            updateBundleFailure,
            updateBundleSuccess,
            firecoPad
        } = this.props;
        const {/*, decorators*/ getLocationId} = this.state;

        const onAstReady = (astResult) => {
            if (!astResult.ast) {
                updateBundleFailure({js: astResult.astError});
                return;
            }

            if (!this.autoLog) {
                this.autoLog = new AutoLog(firecoPad.j);
            }

            this.autoLog.transformWithLocationIds(astResult.ast, getLocationId)
                .then(autoLogger => {
                    const bundle = {
                        editorsTexts: currentEditorsTexts,
                        alJs: autoLogger.getCode(),
                        autoLog: this.autoLog,
                        autoLogger: autoLogger,
                    };
                    const dispatchBundle = () => {
                        if (this.traceSubscriber) {
                            this.traceSubscriber.unsubscribe();
                        }
                        // console.log('alJs', bundle.alJs);

                        this.objectNodeRenderer =
                            createLiveObjectNodeRenderer(autoLogger);
                        this.timeline = [];
                        this.isNew = true;
                        this.depLocs = bundle.autoLogger.deps.dependencies;
                        //   this.unHighlightLiveExpressions();
                        this.refreshInterval =
                            setInterval(this.refreshTimeline, this.refreshRate);
                        this.traceSubscriber = autoLogger.trace;
                        this.locationMap = autoLogger.locationMap;
                        this.traceSubscriber.subscribe(this.handleTraceChange);

                        updateBundleSuccess(bundle);
                    };

                    dispatchBundle();
                })
        };

        firecoPad.getAst().then(onAstReady).catch(
            error => console.log('Invalidated AST', error)
        );

    };

    handleTraceChange = ({timeline, logs, mainLoadedTimelineI}) => {
        this.timeline = timeline;
        this.logs = logs;
        this.mainLoadedTimelineI = mainLoadedTimelineI;
        this.refreshTimeline();
    };

    highlightLiveExpressions = (
        liveRanges, ignoreRanges, navRanges, isReveal = false
    ) => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        const locToMonacoRange = firecoPad
            .liveExpressionWidgetProvider
            .locToMonacoRange;

        liveRanges = liveRanges.filter(ran => {
            return !ignoreRanges.find(r => {
                return r.containsRange(ran);
            });
        });

        const dependencyRanges = []

        if (this.mainLoadedTimelineI && this.depLocs) {

            Object.keys(this.depLocs).forEach(key => {
                const loc = this.depLocs[key];
                const range = loc ? locToMonacoRange(loc[0]) : null;
                range && dependencyRanges.push(range);
            });

        }

        const res = this.highlightTexts(
            liveRanges,
            {
                inlineClassName:
                MonacoExpressionClassNames.liveExpressionClassName
            },
            this.prevDecorationIds,
            isReveal,
            true
        );
        this.prevDecorationIds = res ? res.decorationIds : [];
        const res2 = this.highlightTexts(
            ignoreRanges,
            {
                inlineClassName:
                MonacoExpressionClassNames.deadExpressionClassName,
            },
            this.prevIgnoreDecorationIds,
            isReveal,
            true
        );
        this.prevIgnoreDecorationIds = res2 ? res2.decorationIds : [];

        const res3 = this.highlightTexts(
            navRanges,
            {
                inlineClassName:
                MonacoExpressionClassNames.liveExpressionNavClassName
            },
            this.prevNavDecorationIds,
            isReveal,
            true
        );
        this.prevNavDecorationIds = res3 ? res3.decorationIds : [];

        const dependencyHighlightIds = this.highlightTexts(
            dependencyRanges,
            {
                inlineClassName:
                MonacoExpressionClassNames.liveExpressionDependencyClassName
            },
            this.prevDependencyHighlightIds,
            isReveal,
            true
        );
        this.prevDependencyHighlightIds = res3 ?
            dependencyHighlightIds.decorationIds : [];
    };

    unHighlightLiveExpressions = () => {
        const {firecoPad} = this.props;
        if (!firecoPad?.monacoEditor) {
            return;
        }
        if (this.prevDecorationIds?.length) {
            this.prevDecorationIds =
                firecoPad.monacoEditor.deltaDecorations(
                    this.prevDecorationIds, []
                );
        }
        if (this.prevIgnoreDecorationIds?.length) {
            this.prevIgnoreDecorationIds =
                firecoPad.monacoEditor.deltaDecorations(
                    this.prevIgnoreDecorationIds, []
                );
        }
    };

    highlightErrors = (
        liveRanges,
        ignoreRanges,
        isReveal = false,
        isLoc = false
    ) => {
        if (!liveRanges) {
            this.unHighlightErrors();
            return;
        }
        //  console.log('ignoreRanges', ignoreRanges);
        liveRanges = liveRanges.filter(ran => {
            return !ignoreRanges.find(r => {
                return r.containsRange(ran);
            });
        });
        // this.unHighlightLiveExpressions();
        const res = this.highlightTexts(
            liveRanges,
            {
                inlineClassName:
                MonacoExpressionClassNames.errorExpressionClassName,
                linesDecorationsClassName: `${
                   MonacoExpressionClassNames.errorExpressionClassName
                }-lineDecoration`,
            },
            this.prevErrorDecorationIds,
            isReveal,
            !isLoc
        );
        this.prevErrorDecorationIds = res ? res.decorationIds : [];

    };

    unHighlightErrors = () => {
        if (this.prevErrorDecorationIds && this.prevErrorDecorationIds.length) {
            const {firecoPad} = this.props;
            if (!firecoPad) {
                return;
            }
            this.prevErrorDecorationIds = firecoPad.monacoEditor.deltaDecorations(this.prevErrorDecorationIds, []);
        }
    };

    highlightBranch = (navigationType, loc, matches, isReveal) => {
        this.prevBranch = this.prevBranch || {};
        if (!loc) {
            this.unHighlightBranch(navigationType);
            return;
        }
        const type = NavigationTypes.Global === navigationType ?
            MonacoHighlightTypes.globalBranch : MonacoHighlightTypes.localBranch;

        this.prevBranch[navigationType] = {
            single: this.highlightTexts(
                [loc],
                {
                    isWholeLine: true,
                    className: type,
                    linesDecorationsClassName: `${type}-decoration`,
                }, this.prevBranch[navigationType] ?
                    this.prevBranch[navigationType].single.decorationIds : [], isReveal)
            ,
            matches: matches ? this.highlightTexts(
                matches,
                {
                    className: `${type}-match`
                }, this.prevBranch[navigationType] && this.prevBranch[navigationType].matches ?
                    this.prevBranch[navigationType].matches.decorationIds : [], false)
                : null
        }
    };

    unHighlightBranch = (navigationType) => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        if (this.prevBranch[navigationType] && this.prevBranch[navigationType].single.decorationIds.length) {
            this.prevBranch[navigationType].single.decorationIds =
                firecoPad.monacoEditor.deltaDecorations(this.prevBranch[navigationType].single.decorationIds, []);
            firecoPad.monacoEditor.restoreViewState(this.prevBranch[navigationType].single.viewState);
        }
        if (this.prevBranch[navigationType] &&
            this.prevBranch[navigationType].matches && this.prevBranch[navigationType].matches.decorationIds.length) {
            this.prevBranch[navigationType].matches.decorationIds =
                firecoPad.monacoEditor.deltaDecorations(this.prevBranch[navigationType].matches.decorationIds, []);
        }
    };

    highlightBranches = (navigationType, branches, matches, isReveal) => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        const createMonacoRange = firecoPad.liveExpressionWidgetProvider.createMonacoRange;
        this.prevBranches = this.prevBranches || {};
        if (!branches) {
            this.unHighlightBranches(navigationType);
            return;
        }
        const type = NavigationTypes.Global === navigationType ?
            MonacoHighlightTypes.globalBranch : MonacoHighlightTypes.localBranch;

        this.prevBranches[navigationType] = {
            single: this.highlightTexts(
                branches,
                {
                    isWholeLine: true,
                    className: type,
                    linesDecorationsClassName: `${type}-default-decoration`,
                }, this.prevBranches[navigationType] ?
                    this.prevBranches[navigationType].single.decorationIds : [], isReveal, true)
            ,
            matches: null
        };
        // console.log('ffff', branches);
        const headers = branches.reduce((headers, branch) => {
            headers.push(createMonacoRange(branch.startLineNumber, 0, branch.startLineNumber, 0));
            headers.push(createMonacoRange(branch.endLineNumber, 0, branch.endLineNumber, 0));
            return headers;
        }, []);

        this.prevBranches[`${navigationType}-delimiter`] = {
            single: this.highlightTexts(
                headers,
                {
                    isWholeLine: true,
                    className: type,
                    linesDecorationsClassName: `${type}-delimiter-decoration`,
                }, this.prevBranches[navigationType] ?
                    this.prevBranches[navigationType].single.decorationIds : [], isReveal, true)
            ,
            matches: null
        }
    };

    unHighlightBranches = (navigationType) => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        if (this.prevBranches
            && this.prevBranches[navigationType] && this.prevBranches[navigationType].single.decorationIds.length) {
            this.prevBranches[navigationType].single.decorationIds =
                firecoPad.monacoEditor.deltaDecorations(this.prevBranches[navigationType].single.decorationIds, []);
            firecoPad.monacoEditor.restoreViewState(this.prevBranches[navigationType].single.viewState);
            this.prevBranches[`${navigationType}-delimiter`].single.decorationIds =
                firecoPad
                    .monacoEditor
                    .deltaDecorations(this.prevBranches[`${navigationType}-delimiter`].single.decorationIds, []);
            firecoPad.monacoEditor.restoreViewState(this.prevBranches[`${navigationType}-delimiter`].single.viewState);
        }
        // if (this.prevBranches[navigationType] &&
        //     this.prevBranches[navigationType].matches
        // && this.prevBranches[navigationType].matches.decorationIds.length) {
        //     const {firecoPad} = this.props;
        //     this.prevBranches[navigationType].matches.decorationIds =
        //         firecoPad.monacoEditor.deltaDecorations(this.prevBranches[navigationType].matches.decorationIds, []);
        // }
    };


    highlightSingleText = (loc, type = MonacoHighlightTypes.text, matches, isReveal = true) => {
        if (!loc) {
            this.unHighlightSingleText();
            return;
        }

        this.prevSingleTextState = {
            single: this.highlightTexts(
                [loc],
                {
                    className: type
                },
                this.prevSingleTextState ?
                    this.prevSingleTextState.single.decorationIds : [], isReveal)
            ,
            matches: matches ? this.highlightTexts(
                matches,
                {
                    className: `${type}-match`
                }, this.prevSingleTextState && this.prevSingleTextState.matches ?
                    this.prevSingleTextState.matches.decorationIds : [], false)
                : null
        }
    };

    unHighlightSingleText = () => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        if (this.prevSingleTextState && this.prevSingleTextState.single.decorationIds.length) {
            this.prevSingleTextState.single.decorationIds =
                firecoPad.monacoEditor.deltaDecorations(this.prevSingleTextState.single.decorationIds, []);
            firecoPad.monacoEditor.restoreViewState(this.prevSingleTextState.single.viewState);
        }
        if (this.prevSingleTextState && this.prevSingleTextState.matches
            && this.prevSingleTextState.matches.decorationIds.length) {
            this.prevSingleTextState.matches.decorationIds =
                firecoPad.monacoEditor.deltaDecorations(this.prevSingleTextState.matches.decorationIds, []);
        }
    };

    setCursorToLocation = (loc) => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        const locToMonacoRange = firecoPad
            .liveExpressionWidgetProvider
            .locToMonacoRange;
        const range = loc ? locToMonacoRange(loc) : null;
        if (range) {
            firecoPad.monacoEditor.setPosition(range.getStartPosition());
            this.prevSingleTextState &&
            (this.prevSingleTextState.single.viewState = firecoPad.monacoEditor.saveViewState());
        }
    };

    highlightTexts = (
        locs, options, prevDecorationIds, isReveal = false, areRanges = false
    ) => {
        const {firecoPad} = this.props;

        if (!firecoPad || !locs) {
            return;
        }
        const locToMonacoRange = firecoPad
            .liveExpressionWidgetProvider
            .locToMonacoRange;

        const decorations = locs.map(loc => ({
            range: areRanges ? loc : locToMonacoRange(loc),
            options: options
        }));
        let viewState = null;
        if (isReveal && decorations.length) {
            viewState = firecoPad.monacoEditor.saveViewState();
            this.revealText(firecoPad.monacoEditor, decorations[decorations.length - 1].range);
        }

        return {
            viewState: viewState,
            decorationIds: firecoPad.monacoEditor.deltaDecorations(prevDecorationIds || [], decorations)
        };
    };

    revealText = (monacoEditor, range, ifOutsideViewport) => {
        ifOutsideViewport ?
            monacoEditor.revealRangeInCenterIfOutsideViewport(range)
            : monacoEditor.revealRangeInCenter(range);
    };

    getEditorTextInLoc = (loc) => {
        const {firecoPad} = this.props;

        if (!firecoPad?.monacoEditor?.getModel
            || !firecoPad?.liveExpressionWidgetProvider?.locToMonacoRange) {
            console.warn("Monaco editor's text in loc not ready.");
            return '';
        }

        if (!loc) {
            console.log("No text location provided.");
            return '';
        }

        return firecoPad.monacoEditor.getModel().getValueInRange(
            firecoPad.liveExpressionWidgetProvider.locToMonacoRange(loc)
        );
    };

    colorizeDomElement = (ref) => {
        const {firecoPad} = this.props;
        if (!firecoPad) {
            return;
        }
        return firecoPad.liveExpressionWidgetProvider.colorizeElement(ref);
    };


    refreshTimeline = () => {
        let isRefresh = this.timeline !== this.prevTimeline || this.logs !== this.prevLogs;
        //let isRefresh = this.timeline !== this.validTimeline || this.logs !== this.prevLogs;
        if (isRefresh) {
            if (this.didUpdate) {
                this.didUpdate = false;
                this.prevTimeline = this.timeline;
                this.prevLogs = this.logs;
                // this.validTimeline =
                //     this.timeline && this.timeline.length?
                //     this.timeline:this.validTimeline||[];
                this.props.liveExpressionStoreChange?.(this, this.isNew);//set via props
                this.isNew = false;
            }
        }
    };

    afterWidgetize = ({decorators, hasDecoratorIdsChanged, getLocationId}) => {//decorators
        this.setState({
            decorators,
            hasDecoratorIdsChanged,
            getLocationId
        });
    };
}

LiveExpressionStore.propTypes = {
    classes: PropTypes.object.isRequired,
    editorId: PropTypes.string.isRequired,
    liveExpressionStoreChange: PropTypes.func,
    updateBundle: PropTypes.func.isRequired,
};

const LiveExpressionStoreWithContext = props => (
    <PastebinContext.Consumer>
        {context => <LiveExpressionStore {...props} {...context}/>}
    </PastebinContext.Consumer>
);
export default connect(mapStateToProps, mapDispatchToProps)(withStyles(styles)(LiveExpressionStoreWithContext));