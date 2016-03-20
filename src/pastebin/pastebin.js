import {inject} from 'aurelia-framework';
import {EventAggregator} from 'aurelia-event-aggregator';
import {Router} from 'aurelia-router';
import {JsEditor} from '../jsEditor/js-editor';
import {JsGutter} from '../jsGutter/js-gutter';
import {ConsoleWindow} from '../consoleWindow/console-window';
import {HtmlEditor} from '../htmlEditor/html-editor';
import {CssEditor} from '../cssEditor/css-editor';
import {HtmlViewer} from '../htmlViewer/html-viewer';
import {VisViewer} from '../visViewer/vis-viewer';
import {TraceService} from '../traceService/traceService'

@inject(Router)
export class Pastebin {

  constructor(router) {
    this.eventAggregator = new EventAggregator();
    this.router = router;
    this.heading = 'Pastebin';
    this.jsEditor = new JsEditor(this.eventAggregator);
    this.jsGutter = new JsGutter(this.eventAggregator);
    this.consoleWindow = new ConsoleWindow(this.eventAggregator);
    this.htmlEditor = new HtmlEditor(this.eventAggregator);
    this.cssEditor = new CssEditor(this.eventAggregator);
    this.htmlViewer = new HtmlViewer(this.eventAggregator);
    this.visViewer = new VisViewer(this.eventAggregator);
    
    this.trace = [
       {  
          "type":"VariableDeclarator",
          "id":"a",
          "text":"true",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"true"
             }
          ],
          "range":{  
             "start":{  
                "row":1,
                "column":8
             },
             "end":{  
                "row":1,
                "column":12
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"VariableDeclarator",
          "id":"b",
          "text":"true||false",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"true"
             }
          ],
          "range":{  
             "start":{  
                "row":2,
                "column":9
             },
             "end":{  
                "row":2,
                "column":20
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"VariableDeclarator",
          "id":"c",
          "text":"1>5",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"false"
             }
          ],
          "range":{  
             "start":{  
                "row":3,
                "column":9
             },
             "end":{  
                "row":3,
                "column":12
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"AssignmentExpression",
          "id":"d",
          "text":"0",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"0"
             }
          ],
          "range":{  
             "start":{  
                "row":10,
                "column":6
             },
             "end":{  
                "row":10,
                "column":7
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"ForStatement",
          "id":"d=0",
          "text":"d=0",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"0"
             }
          ],
          "range":{  
             "start":{  
                "row":10,
                "column":0
             },
             "end":{  
                "row":12,
                "column":1
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"ForStatement",
          "id":"d<5",
          "text":"d<5",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"false"
             }
          ],
          "range":{  
             "start":{  
                "row":10,
                "column":0
             },
             "end":{  
                "row":12,
                "column":1
             }
          },
          "hits":7,
          "extra":""
       },
       {  
          "type":"ForStatement",
          "id":"d++",
          "text":"d++",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"0"
             },
             {  
                "stackIndex":-1,
                "value":"1"
             },
             {  
                "stackIndex":-1,
                "value":"2"
             },
             {  
                "stackIndex":-1,
                "value":"3"
             },
             {  
                "stackIndex":-1,
                "value":"4"
             }
          ],
          "range":{  
             "start":{  
                "row":10,
                "column":0
             },
             "end":{  
                "row":12,
                "column":1
             }
          },
          "hits":6,
          "extra":""
       },
       {  
          "type":"VariableDeclarator",
          "id":"e",
          "text":"5",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"5"
             }
          ],
          "range":{  
             "start":{  
                "row":13,
                "column":8
             },
             "end":{  
                "row":13,
                "column":9
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"WhileStatement",
          "id":"e>0",
          "text":"e>0",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"false"
             }
          ],
          "range":{  
             "start":{  
                "row":14,
                "column":0
             },
             "end":{  
                "row":16,
                "column":1
             }
          },
          "hits":7,
          "extra":""
       },
       {  
          "type":"ExpressionStatement",
          "id":"e--",
          "text":"e--",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"5"
             },
             {  
                "stackIndex":-1,
                "value":"4"
             },
             {  
                "stackIndex":-1,
                "value":"3"
             },
             {  
                "stackIndex":-1,
                "value":"2"
             },
             {  
                "stackIndex":-1,
                "value":"1"
             }
          ],
          "range":{  
             "start":{  
                "row":15,
                "column":4
             },
             "end":{  
                "row":15,
                "column":8
             }
          },
          "hits":6,
          "extra":""
       },
       {  
          "type":"VariableDeclarator",
          "id":"f",
          "text":"0",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"0"
             }
          ],
          "range":{  
             "start":{  
                "row":17,
                "column":8
             },
             "end":{  
                "row":17,
                "column":9
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"ExpressionStatement",
          "id":"f++",
          "text":"f++",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"0"
             },
             {  
                "stackIndex":-1,
                "value":"1"
             },
             {  
                "stackIndex":-1,
                "value":"2"
             },
             {  
                "stackIndex":-1,
                "value":"3"
             },
             {  
                "stackIndex":-1,
                "value":"4"
             }
          ],
          "range":{  
             "start":{  
                "row":19,
                "column":4
             },
             "end":{  
                "row":19,
                "column":8
             }
          },
          "hits":6,
          "extra":""
       },
       {  
          "type":"DoWhileStatement",
          "id":"f < 5",
          "text":"f < 5",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"true"
             },
             {  
                "stackIndex":-1,
                "value":"false"
             }
          ],
          "range":{  
             "start":{  
                "row":18,
                "column":0
             },
             "end":{  
                "row":21,
                "column":14
             }
          },
          "hits":6,
          "extra":""
       },
       {  
          "type":"Property",
          "id":"\"a\"",
          "text":"\"1\"",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"\"1\""
             }
          ],
          "range":{  
             "start":{  
                "row":22,
                "column":9
             },
             "end":{  
                "row":22,
                "column":16
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"Property",
          "id":"\"b\"",
          "text":"\"2\"",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"\"2\""
             }
          ],
          "range":{  
             "start":{  
                "row":22,
                "column":17
             },
             "end":{  
                "row":22,
                "column":24
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"VariableDeclarator",
          "id":"g",
          "text":"{\"a\":\"1\",\"b\":\"2\"}",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"{\"a\":\"1\",\"b\":\"2\"}"
             }
          ],
          "range":{  
             "start":{  
                "row":22,
                "column":8
             },
             "end":{  
                "row":22,
                "column":25
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"ForInStatement",
          "id":"g",
          "text":"g",
          "values":[  
             {  
                "stackIndex":-1,
                "value":"{\"a\":\"1\",\"b\":\"2\"}"
             }
          ],
          "range":{  
             "start":{  
                "row":23,
                "column":0
             },
             "end":{  
                "row":25,
                "column":1
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"CallExpression",
          "id":"console.log",
          "text":"console.log(gee)",
          "values":[  
             {  
                "stackIndex":-1
             },
             {  
                "stackIndex":-1
             }
          ],
          "range":{  
             "start":{  
                "row":24,
                "column":4
             },
             "end":{  
                "row":24,
                "column":20
             }
          },
          "hits":3,
          "extra":""
       },
       {  
          "type":"ReturnStatement",
          "id":"5",
          "text":"5",
          "values":[  
             {  
                "stackIndex":0,
                "value":"5"
             }
          ],
          "range":{  
             "start":{  
                "row":27,
                "column":11
             },
             "end":{  
                "row":27,
                "column":12
             }
          },
          "hits":1,
          "extra":""
       },
       {  
          "type":"CallExpression",
          "id":"x",
          "text":"x()",
          "values":[  
             {  
                "stackIndex":0,
                "value":"5"
             }
          ],
          "range":{  
             "start":{  
                "row":29,
                "column":0
             },
             "end":{  
                "row":29,
                "column":3
             }
          },
          "hits":1,
          "extra":""
       }
    ];

    
    this.visualizations = [
          {
              type: "table",
              data: {
                  columns: [
                    "x",
                    "y"
                  ],
                  values: [
                    {
                        a: 3,
                        b: 5
                    },
                    {
                        a: 4,
                        b: 6
                    }
                  ]
              }
          }
        ];
  }

  activate(params) {
    if (params.id) {
      let id = params.id;
      this.pastebinId = id;
      this.jsEditor.activate({ id: id });
      this.htmlEditor.activate({ id: id });
      this.cssEditor.activate({ id: id });
    } else {
      let baseURL = 'https://seecoderun.firebaseio.com';
      let firebase = new Firebase(baseURL);
      
      let id = firebase.push().key();
      this.router.navigateToRoute('pastebin', { id: id });
    }
    
    this.subscribe();
  }

  attached() {
    this.jsEditor.attached();
    this.jsGutter.attached();
    this.consoleWindow.attached();
    this.htmlEditor.attached();
    this.cssEditor.attached();
    this.visualizations[0].data.columns = this.getVariables(this.trace);
    this.visViewer.attached(this.visualizations);
    
  }

  subscribe() {
    let ea = this.eventAggregator;
    
    ea.subscribe('onEditorChanged', payload => {
      // add code for subscribe event
    });

    ea.subscribe('onCursorMoved', payload => {
      // add code for subscribe event
    });
  }
  
  getVariables(trace) {
    let vars = new Set();
    for(let t of trace) {
      if(t.type === 'VariableDeclarator') {
        vars.add(t.id);
      }
    }
      
    return Array.from(vars);
  }
}
