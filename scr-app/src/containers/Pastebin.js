import 'react-resizable/css/styles.css';
import '../utils/react-grid-layout-scr-theme.css';
import React, {Component, createContext} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import throttle from 'lodash/throttle';
import debounce from 'lodash/debounce';
import {Responsive} from 'react-grid-layout';
import {withStyles} from '@material-ui/core/styles';
import {darken} from '@material-ui/core/styles/colorManipulator';
import Paper from '@material-ui/core/Paper';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DragHandleIcon from '@material-ui/icons/DragHandle';
import Drawer from '@material-ui/core/Drawer';
import TvIcon from '@material-ui/icons/Tv';
import LanguageHtml5Icon from 'mdi-material-ui/LanguageHtml5';
import LanguageJavaScriptIcon from 'mdi-material-ui/LanguageJavascript';
import LanguageCss3Icon from 'mdi-material-ui/LanguageCss3';
import CodeTagsCheckIcon from 'mdi-material-ui/CodeTagsCheck';
import SortAscendingIcon from 'mdi-material-ui/SortAscending';
import SortDescendingIcon from 'mdi-material-ui/SortDescending';
import SortAlphabeticalAscendingIcon
    from 'mdi-material-ui/SortAlphabeticalAscending';
import SortAlphabeticalDescendingIcon
    from 'mdi-material-ui/SortAlphabeticalDescending';
import SortNumericAscendingIcon from 'mdi-material-ui/SortNumericAscending';
import SortNumericDescendingIcon from 'mdi-material-ui/SortNumericDescending';
import {configureFindChunks, functionLikeExpressions} from '../utils/scrUtils';

import Editor from './Editor';
import Playground from './Playground';
import SizeProvider from '../utils/SizeProvider';
import {
    configureDefaultGridLayoutFormatter
} from '../utils/reactGridLayoutUtils';
import {
    configureDefaultGridLayoutFormatter as configureDefaultGridLayoutCompactFormatter
} from '../utils/reactGridLayoutCompactUtils';
import DebugContainer from "../components/DebugContainer";
import ScrollingList from "../components/ScrollingList";
import TraceControls from '../components/TraceControls';
import PointOfView, {createPointOfViewTile} from "../components/PointOfView";

let isCompact = true;
let gridLayoutFormatter = isCompact ?
    configureDefaultGridLayoutCompactFormatter() : configureDefaultGridLayoutFormatter();

export const PastebinContext = createContext({});
export const VisualQueryManager = {
    onChange: (els, keys, event) => {
    },
    visualElements: [],
};
export const d = {
    //Matches PointOfView.createPointOfViewTile(...)
    log: (id, expressionText, expressionLanguage = 'typescript', fromData, toData, dataLanguage = 'json') => {
    },
};

const animationId = `scr-a-id-${Date.now()}`;

export const TABLE_ROW_HEIGHT = 32;

const CONFIGURE_PASTEBIN_LAYOUT = 'CONFIGURE_PASTEBIN_LAYOUT';
export const pastebinConfigureLayout =
    (restoreGridLayouts, getCurrentGridLayouts) => {
        return {
            type: CONFIGURE_PASTEBIN_LAYOUT,
            restoreGridLayouts,
            getCurrentGridLayouts,
        };
    };

const mapDispatchToProps = {pastebinConfigureLayout};


const sortOptions = [
    {
        time: true,
        desc: true,
        Icon: SortDescendingIcon,
    },
    {
        time: true,
        asc: true,
        Icon: SortAscendingIcon,

    },
    {
        expression: true,
        desc: true,
        Icon: SortAlphabeticalDescendingIcon,
    },
    {
        expression: true,
        asc: true,
        Icon: SortAlphabeticalAscendingIcon,

    },
    {
        value: true,
        desc: true,
        Icon: SortNumericDescendingIcon,
    },
    {
        value: true,
        asc: true,
        Icon: SortNumericAscendingIcon,

    }
];

const getSortIcon = (orderBy, orderFlow) => (
    (sortOptions[
        sortOptions.findIndex(
            sortOption => sortOption[orderBy] && sortOption[orderFlow]
        )
        ] || {}).Icon
);

const getNextSortOption = (orderBy, orderFlow) => (
    sortOptions[(
        sortOptions.findIndex(
            sortOption => sortOption[orderBy] && sortOption[orderFlow]
        )
        + 1
    ) % sortOptions.length] // returns first sort option  if not found
);

// sortOptions.forEach(
// value => console.log(value, getNextSortOption(...Object.keys(value))))

const styles = theme => ({
    layout: {
        overflow: 'visible',
    },
    button: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        float: 'right',
        margin: theme.spacing(1),
    },
    icon: {
        position: 'absolute',
        zIndex: theme.zIndex.snackbar,
        right: theme.spacing(0.5),
        top: theme.spacing(0.25),
        color: darken(theme.palette.action.disabled, 0.5),
        fontSize: theme.spacing(3),
    },
    locatorButton: {
        position: 'absolute',
        zIndex: theme.zIndex.snackbar,
        bottom: theme.spacing(3),
        right: 0,
    },
    locator: {
        fontSize: theme.spacing(2),
    },
    draggable: {
        position: 'absolute',
        zIndex: theme.zIndex.snackbar,
        bottom: theme.spacing(2),
        right: theme.spacing(4),
        color: 'rgba(30, 144, 255, 0.7)', // same as utils/react-grid-layout-scr-theme.css
        fontSize: theme.spacing(2),
        cursor: 'grab',
        '&:active': {
            cursor: 'grabbing',
        }
    },
    [`@keyframes ${animationId}`]: {
        to: {
            visibility: 'visible',
        },
        from: {
            visibility: 'hidden',
        }
    },
    loadingFeedback: {
        position: 'absolute',
        bottom: theme.spacing(1),
        left: '50%',
        color: theme.palette.secondary.main,
        visibility: 'hidden',
        animation: `${animationId} 1s linear 1s infinite alternate`,
    },
});

let automaticLayout = 0;

class Pastebin extends Component {
    constructor(props) {
        super(props);
        this.debugScrollerRef = React.createRef();
        this.updateMonacoEditorLayouts = {};
        this.debugScrollerRefSnapshots = {};
        this.scrollingListContainers = {};
        VisualQueryManager.onChange = this.onVisualQueryChange;
        d.log = this.handleChangePointOfViewTiles;
    }

    static getDerivedStateFromProps(nextProps, prevState) {
        if (nextProps.width !== prevState.width || nextProps.height !== prevState.height) {
            automaticLayout++;
            return {
                width: nextProps.width,
                height: nextProps.height,
            };
        }
        return null;
    }

    onVisualQueryChange = (visualQuery, visualIds, event) => {
        this.setState(prevState => {
            let visualQueryHover = prevState.searchState.visualQueryHover || [];
            let selectedVisualQueries = prevState.searchState.selectedVisualQueries || [];
            switch (event) {
                case 'click':
                    if (selectedVisualQueries === visualQuery) {
                        selectedVisualQueries = [];
                    } else {
                        selectedVisualQueries = visualQuery;
                    }
                    // if (selectedVisualQueries.includes(visualQuery)) {
                    //     selectedVisualQueries = [...selectedVisualQueries].filter(s => s !== visualQuery);
                    // } else {
                    //     selectedVisualQueries = [...selectedVisualQueries];
                    //     selectedVisualQueries.push(visualQuery);
                    // }
                    break;
                case 'mouseenter':
                    visualQueryHover = visualQuery;
                    break;
                default:
                    visualQueryHover = [];
            }

            // let newVisualQuery = selectedVisualQueries.reduce((r, q) => {
            //     q.forEach(e => r.push(e))
            //     return r;
            // }, []);
            let newVisualQuery =
                visualQueryHover && visualQueryHover.length ? visualQueryHover : selectedVisualQueries;
            // let newVisualQuery = selectedVisualQueries.concat(visualQueryHover);
            // newVisualQuery = newVisualQuery.reduce((r, e) => {
            //     if (!r.includes(e)) {
            //         r.push(e);
            //     }
            //     return r;
            // }, []);
            const newSearchState = {
                ...this.state.searchState,
                visualQuery: newVisualQuery,
                visualQueryHover,
                selectedVisualQueries
            };
            const {orderBy, order, isPlaying, timeline, getEditorTextInLoc} = this.state;
            const data = this.createData(timeline, getEditorTextInLoc, newSearchState);
            // console.log(orderBy, order, orderBy === 'time' && order === 'desc');
            const sortedData =
                orderBy === 'time' && order === 'desc' ? data : this.sortData(data, orderBy, order);
            return {
                data: sortedData,
                searchState: newSearchState
            }
        });
    };

    onGridResize = (isResizing) => {
        const {onResize} = this;
        onResize && onResize(isResizing);
    }

    handleChangeDebugLoading = (isLoading) => {
        this.setState({isDebugLoading: isLoading});
    };

    getCurrentGridLayouts = () => {
        return gridLayoutFormatter.currentGridLayouts;
    };

    restoreGridLayouts = gridLayouts => {
        gridLayouts =
            gridLayoutFormatter.validateLayout(gridLayouts, gridLayoutFormatter.currentBreakPoint);
        this.setState({
            gridLayouts: gridLayouts,
        });
        gridLayoutFormatter.currentGridLayouts = gridLayouts;
        automaticLayout++;
        this.onDebugContainerResizeEnd(false);
    };

    resetGridLayout = layout => {
        this.restoreGridLayouts(gridLayoutFormatter.getLayoutDummy(layout));
        setTimeout(() => {
            this.restoreGridLayouts(layout || gridLayoutFormatter.getDefaultGridLayouts());
        }, 0);

    };

    getRowsLayout = (isNew) => {
        if (this.debugScrollerRef.current) {
            // console.log(
            // 'this.debugScrollerRef.current.scrollHeight',
            // , this.debugScrollerRef.current.scrollHeight, this.debugScrollerRef.current.style);
            const defaultRowsPerPage = (
                parseInt(this.debugScrollerRef.current.getBoundingClientRect().height / TABLE_ROW_HEIGHT, 10)
            );
            const rowsPerPage = isNew ?
                defaultRowsPerPage : Math.max(
                    this.state.rowsPerPage,
                    defaultRowsPerPage
                );
            if (rowsPerPage !== this.state.rowsPerPage
                || defaultRowsPerPage !== this.state.defaultRowsPerPage) {
                return {rowsPerPage, defaultRowsPerPage};
            } else {
                return null;
            }
        }
        return {defaultRowsPerPage: this.state.minRows};
    };

    debouncedOnDebugContainerResizeEnd = debounce((isNew) => {
        const rowsLayout = this.getRowsLayout(isNew);
        if (rowsLayout) {
            this.setState(rowsLayout);
        }
        this.handleChangeDebugLoading(false);
    }, 50);

    onDebugContainerResizeEnd = (isNew) => {
        this.handleChangeDebugLoading(true);
        this.debouncedOnDebugContainerResizeEnd(isNew);
    };

    //layout: Layout, oldItem: LayoutItem, newItem: LayoutItem,
    // placeholder: LayoutItem, e: MouseEvent, element: HTMLElement
    onResizeStart = (layout, oldItem, newItem,
                     placeholder, e, element) => {
        // gridLayoutFormatter.formatLayout(layout, oldItem, newItem);
        this.onGridResize(true);
    };

    handleAutomaticLayout = () => {
        if (this.automaticLayout !== automaticLayout) {
            this.automaticLayout = automaticLayout;
            for (const editorId in this.updateMonacoEditorLayouts) {
                this.updateMonacoEditorLayouts[editorId] && this.updateMonacoEditorLayouts[editorId]();
            }
        }
    };

    handleAutomaticLayoutThrottled = throttle(this.handleAutomaticLayout, 100);
    handleAutomaticLayoutDebounced = debounce(this.handleAutomaticLayout, 100);

    onResize = (layout, oldItem, newItem
                /*, placeholder, e, element*/) => {
        gridLayoutFormatter.formatLayout(layout, oldItem, newItem);
        automaticLayout++;
        this.handleAutomaticLayoutThrottled();
    };

    onResizeStop = (layout, oldItem, newItem
                    /*, placeholder, e, element*/) => {
        gridLayoutFormatter.formatLayout(layout, oldItem, newItem);
        // if (newItem.i === 'debugContainer') {
        this.onDebugContainerResizeEnd(false);
        // }
        automaticLayout++;
        this.handleAutomaticLayoutDebounced();
        this.onGridResize(false);
    };

    formatDrag = layout => {
        gridLayoutFormatter.layoutDragPositionInvariant(layout);
    };

    onDragStart = itemCallback => {
        this.formatDrag(itemCallback);
    };
    onDrag = itemCallback => {
        this.formatDrag(itemCallback);
    };
    onDragStop = itemCallback => {
        this.formatDrag(itemCallback);
    };

    onLayoutChange = (newLayout, newGridLayouts) => {
        gridLayoutFormatter.currentGridLayouts = newGridLayouts;
        this.handleAutomaticLayoutDebounced();
    };

    onBreakpointChange = (newBreakpoint /*, newCols*/) => {
        gridLayoutFormatter.onBreakpointChange(newBreakpoint);
        this.handleAutomaticLayoutDebounced();
    };

    handleChangeTimeFlow = (event, property, order) => {
        this.setState((prevState) => {
            let {timeFlow, data, logData} = prevState;
            const orderBy = 'time';
            if (!order) {
                order = timeFlow;
                if (prevState.orderBy === orderBy) {
                    if (timeFlow === 'desc') {
                        order = 'asc';
                        timeFlow = order;
                    } else {
                        order = 'desc';
                        timeFlow = order;
                    }
                }
            } else {
                timeFlow = order;
            }

            data = this.sortData(data, orderBy, order);
            logData = this.sortData(logData, orderBy, order);
            return {data, logData, order, orderBy, timeFlow};
        });
    };

    handleRequestSort = (event, orderBy, order) => {
        this.setState((prevState) => {
            let {data, logData} = prevState;
            if (!order) {
                order = 'desc';
                if (prevState.orderBy === orderBy &&
                    prevState.order === 'desc') {
                    order = 'asc';
                }
            }

            data = this.sortData(data, orderBy, order);
            logData = this.sortData(logData, orderBy, order);
            return {data, logData, order, orderBy};
        });
    };

    getSortInfo = () => {
        const {order, orderBy, timeFlow} = this.state;
        const orderFlow = orderBy === 'time' ?
            timeFlow : order;
        return {
            handleGetNextSortOption: event => {
                const orderFlow = orderBy === 'time' ? timeFlow : order;
                const nextOptions = getNextSortOption(
                    orderBy,
                    orderFlow
                );
                const nextOptionsKeys = Object.keys(
                    nextOptions
                );

                if (nextOptions.time) {
                    this.handleChangeTimeFlow(event, ...nextOptionsKeys);
                } else {
                    this.handleRequestSort(event, ...nextOptionsKeys);
                }
            },
            SortIcon: getSortIcon(orderBy, orderFlow),
            sortTitle: `Order by ${
                orderBy
            } ${
                orderFlow === 'desc' ?
                    'descending' : 'ascending'
            }`
        };
    }

    sortData = (data, orderBy, order) => {
        return order === 'desc' ?
            data.sort((a, b) => (b[orderBy] < a[orderBy] ? -1 : 1))
            : data.sort((a, b) => (a[orderBy] < b[orderBy] ? -1 : 1));
    };

    handleSelectAllClick = (event, checked) => {
        if (checked) {
            this.setState({selected: this.state.data.map(n => n.id)});
            return;
        }
        this.setState({selected: []});
    };

    handleSelectClick = (event, id) => {
        const {selected} = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
                selected.slice(0, selectedIndex),
                selected.slice(selectedIndex + 1),
            );
        }

        this.setState({selected: newSelected});
    };


    isSelected = id => this.state.selected.indexOf(id) !== -1;

    onScrollChange = (e, scrollData) => {
        //todo fix stop scroll  on end of conatiner
        // const listContainer = this.scrollingListContainers[this.state.tabIndex];
        // if (listContainer && listContainer.current && this.debugScrollerRef.current) {
        //     const scroller = this.debugScrollerRef.current;
        //     const scrollPos =  scroller.scrollHeight - scroller.scrollTop;
        //     const elementHeight = listContainer.current.offsetHeight;
        //     console.log(this.state.tabIndex, scrollPos, elementHeight, scrollData);
        //     if (scroller && scrollPos > elementHeight) {
        //
        //         scroller.scrollTop = scrollPos;
        //        scrollData.scrollTop = scroller.scrollTop;
        //     }
        //     // console.log(this.state.tabIndex, listContainer.current);
        // }
        this.debugScrollerRefSnapshots[this.state.tabIndex] = scrollData;
    }

    handleScrollEnd = (isBottom) => {
        const rowsLayout = this.getRowsLayout(false);
        if (rowsLayout) {
            rowsLayout.rowsPerPage = isBottom ?
                Math.min(
                    this.state.rowsPerPage + this.state.rowsPerPageIncrement,
                    Math.max(
                        (this.state.timeline || []).length,
                        rowsLayout.defaultRowsPerPage || this.state.defaultRowsPerPage)
                )
                : (rowsLayout.defaultRowsPerPage || this.state.defaultRowsPerPage);
            if (rowsLayout.rowsPerPage !== this.state.rowsPerPage) {
                this.setState({rowsPerPage: rowsLayout.rowsPerPage});
            }
        } else {
            const rowsPerPage = isBottom ?
                Math.min(
                    this.state.rowsPerPage + this.state.rowsPerPageIncrement,
                    Math.max(
                        (this.state.timeline || []).length,
                        this.state.defaultRowsPerPage)
                )
                : this.state.defaultRowsPerPage;
            if (rowsPerPage !== this.state.rowsPerPage) {
                this.setState({rowsPerPage});
            }
        }

        this.handleChangeDebugLoading(false);
    };

    debouncedScrollEnd = debounce(this.handleScrollEnd, 50);

    onScrollEnd = (e, isBottom) => {
        if (this.state.tabIndex !== 0) {
            return;
        }

        if (isBottom) {
            this.handleChangeDebugLoading(true);
            this.debouncedScrollEnd(isBottom);
        } else {
            const {rowsPerPage, defaultRowsPerPage} = this.state;
            if (rowsPerPage > defaultRowsPerPage * 3) {
                this.handleChangeDebugLoading(true);
                setTimeout(() => {
                    this.handleScrollEnd(isBottom);
                }, 500);
            }
        }
    };

    scrollToTop = () => {
        if (this.state.tabIndex !== 0) {
            return;
        }
        this.debugScrollerRef.current && (this.debugScrollerRef.current.scrollTop = 0);
    }

    createData(timeline, getEditorTextInLoc, searchState = this.state.searchState) {
        let tl = timeline || [];
        return tl.filter(entry => (entry.isError || !searchState.visualQuery || !searchState.visualQuery.length) ||
            (entry.isOutput && searchState.visualQuery.find(q => entry.outputRefs.includes(q)))
        ).map((entry, i) => ({
            id: entry.reactKey,
            time: entry.i,
            // time: entry.timestamp,
            expression: getEditorTextInLoc(entry.loc),
            value: entry.data,
            loc: {...entry.loc},
            expressionId: entry.id,
            entry: entry,
            isError: entry.isError,
            isGraphical: entry.isDOM,
            funcRefId: entry.funcRefId,
            dataRefId: entry.dataRefId,
        }));
    }

    createLogData(log, getEditorTextInLoc) {
        let l = log || [];
        return l.map((entry, i) => {
            if (entry.isLog) {
                return {
                    id: entry.reactKey,
                    time: entry.i,
                    // time: entry.timestamp,
                    expression: getEditorTextInLoc(entry.loc),
                    value: entry.data,
                    loc: {...entry.loc},
                    expressionId: entry.id,
                    entry: entry,
                    isError: entry.isError,
                    isGraphical: entry.isDOM,
                    funcRefId: entry.funcRefId,
                    dataRefId: entry.dataRefId,
                }
            } else {
                return {
                    id: entry.reactKey,
                    time: entry.i,
                    // time: entry.timestamp,
                    isFromInput: true,
                    value: entry.data,
                    entry: entry,
                    isResult: entry.isResult,
                    isError: entry.isError,
                }
            }
        });
    }

    liveExpressionStoreChange =
        (traceSubscriber, timeline, logs, isNew, HighlightTypes, highlightSingleText, highlightErrors,
         setCursorToLocation, getEditorTextInLoc, colorizeDomElement,
         objectNodeRenderer, handleChange) => {
            const {orderBy, order, isPlaying} = this.state;
            // console.log('sta', this.state.searchState.visualQuery);
            isPlaying && this.handleChangeDebugLoading(true);
            const rowsLayout = this.getRowsLayout(isNew) || {};
            setTimeout(() => {
                if (isPlaying || isNew) {
                    let currentTimeline = isPlaying ? timeline : this.state.timeline;
                    let currentLogs = isPlaying ? logs : this.state.logs;
                    const data = this.createData(currentTimeline, getEditorTextInLoc);
                    const logData = this.createLogData(currentLogs, getEditorTextInLoc);
                    //console.log(orderBy, order,orderBy === 'time' && order === 'desc');
                    const sortedData = this.sortData(data, orderBy, order);
                    const sortedLogData = this.sortData(logData, orderBy, order);

                    const configureMappingEventListeners = (n) => {
                        let onMouseEnter = null, onMouseLeave = null,
                            onClick = null;
                        if (!n.isFromInput) {
                            onMouseEnter = () =>
                                highlightSingleText(
                                    n.loc, n.isError ? HighlightTypes.error
                                        : n.isGraphical ?
                                            HighlightTypes.graphical
                                            : HighlightTypes.text,
                                    traceSubscriber.getMatches(
                                        n.funcRefId,
                                        n.dataRefId,
                                        n.entry.calleeId
                                    )
                                )
                            onMouseLeave = () => highlightSingleText();
                            onClick = () => setCursorToLocation(n.loc)
                        }
                        return {onMouseEnter, onMouseLeave, onClick};
                    };
                    this.setState((prevState) => ({
                        ...rowsLayout, // rowsPerPage, defaulRowsPerPage
                        isNew: isNew,
                        isPlaying: isNew ? true : prevState.isPlaying,
                        traceSubscriber,
                        timeline: currentTimeline,
                        liveTimeline: timeline,
                        logs: currentLogs,
                        liveLogs: logs,
                        data: sortedData,
                        logData: sortedLogData,
                        HighlightTypes,
                        highlightSingleText,
                        highlightErrors,
                        setCursorToLocation,
                        getEditorTextInLoc,
                        colorizeDomElement,
                        objectNodeRenderer,
                        handleChange,
                        configureMappingEventListeners
                    }));
                    this.handleChangeDebugLoading(false);
                } else {
                    this.setState({
                        ...rowsLayout,
                        liveTimeline: timeline,
                        liveLogs: logs,
                        isNew
                    });
                }
            }, 0);
        };

    handleChangePlaying = debounce((id, play) => {
        let {isPlaying, lastHandleChangePlayingId} = this.state;
        if (id === 'table') {
            if (!isPlaying && !lastHandleChangePlayingId) {
                return;
            }

            if (play) {
                lastHandleChangePlayingId = null;
                isPlaying = false;
            } else {
                lastHandleChangePlayingId = id;
                isPlaying = true;
            }

        }

        const {
            orderBy, order, timeline, liveTimeline, logs, liveLogs, getEditorTextInLoc
        } = this.state;
        let currentTimeline = isPlaying ? timeline : liveTimeline;
        let currentLogs = isPlaying ? logs : liveLogs;
        const data = this.createData(currentTimeline, getEditorTextInLoc);
        const logData = this.createLogData(currentLogs, getEditorTextInLoc);
        const sortedData =
            orderBy === 'time' && order === 'desc' ? data : this.sortData(data, orderBy, order);
        this.setState({
            isPlaying: !isPlaying,
            lastHandleChangePlayingId,
            timeline: currentTimeline,
            logs: currentLogs,
            data: sortedData,
            logData
        });
    }, 100);

    handleChangeTab = (event, tabIndex) => {
        if (tabIndex) {
            this.setState({tabIndex});
        }
    };

    handleChangeSearchValue = e => {
        const value = e.target.value || '';
        this.setState({
            searchState: {...this.state.searchState, value: value}
        })
    };

    handleChangeSearchFilterClick = (filter) => {
        const {searchState} = this.state;
        const nextSearchState = {
            ...searchState,
            [filter]: !searchState[filter]
        };
        if (nextSearchState.isWord && nextSearchState.isRegExp) {
            if (filter === 'isWord') {
                nextSearchState.isRegExp = false;
            } else {
                nextSearchState.isWord = false;
            }
        }

        const hasFilter =
            nextSearchState.isFunctions || nextSearchState.isExpressions || nextSearchState.isValues;

        if (!hasFilter) {
            if (filter === 'isFunctions' || filter === 'isExpressions' || filter === 'isValues') {
                nextSearchState[filter] = true;
            } else {
                nextSearchState.isFunctions = true;
            }
        }

        nextSearchState.findChunks =
            configureFindChunks(!nextSearchState.isRegExp, nextSearchState.isCase, nextSearchState.isWord);
        this.setState({searchState: nextSearchState});
    };

    handleChangeAutoExpand = () => {
        this.setState(prevState => ({isAutoExpand: !prevState.isAutoExpand}));
    };

    state = {
        traceAvailable: true,
        autorunDelay: 2000,
        gridLayouts: gridLayoutFormatter.getDefaultGridLayouts(),
        liveExpressionStoreChange: this.liveExpressionStoreChange,
        isDebugLoading: false,
        isSelectable: false,
        tabIndex: 'trace',
        order: 'desc',
        orderBy: 'time',
        selected: [],
        data: [],
        logData: [],
        page: 0,
        rowsPerPage: 10,
        minRows: 10,
        defaultRowsPerPage: 10,
        rowsPerPageIncrement: 100,
        handleChangeDebugLoading: this.handleChangeDebugLoading,
        handleSelectClick: this.handleSelectClick,
        handleSelectAllClick: this.handleSelectAllClick,
        handleRequestSort: this.handleRequestSort,
        isRowSelected: this.isSelected,
        highlightSingleText: () => {
        },
        getEditorTextInLoc: () => {
            return '';
        },
        colorizeDomElement: () => {
        },
        timeline: [],
        logs: [],
        liveTimeline: [],
        liveLogs: [],
        isPlaying: true,
        timeFlow: 'desc',
        handleChangeTimeFlow: this.handleChangeTimeFlow,
        isAutoExpand: false,
        handleChangeAutoExpand: this.handleChangeAutoExpand,
        searchState: {
            functionLikeExpressions: functionLikeExpressions,
            value: '',
            handleChangeValue: this.handleChangeSearchValue,
            isFunctions: true,
            isExpressions: false,
            isValues: false,
            isCase: false,
            isWord: false,
            isRegExp: false,
            handleFilterClick: this.handleChangeSearchFilterClick,
            findChunks: configureFindChunks(true),
            visualQuery: null,
            visualKey: null,
        },
        width: 800,
        height: 600,
        hoveredCellKey: null,
        scrollToTop: this.scrollToTop,
        isGraphicalLocatorActive: false,
        pointOfViewTiles: [],
        configureMappingEventListeners:()=>()=>{},
    };

    handleChangePointOfViewTiles = (...params) => {
        if (params.length) {
            this.setState(prevState => ({
                pointOfViewTiles: [...prevState.pointOfViewTiles, createPointOfViewTile(...params)]
            }));
        } else {
            this.setState({pointOfViewTiles: []});
        }
    };


    handleChangeAutorunDelay = autorunDelay => {
        this.setState({autorunDelay: autorunDelay ? parseInt(autorunDelay, 10) : 0});
    };

    updateMonacoEditorLayout = (editorId) => (monacoEditor) => {
        this.updateMonacoEditorLayouts[editorId] = monacoEditor;
    };

    handleChangeHoveredCellKey = (event, hoveredCellKey) => {
        this.setState({hoveredCellKey});
    }

    handleChangeGraphicalLocator = () => {
        this.setState(prevState => {
            const isGraphicalLocatorActive = !prevState.isGraphicalLocatorActive;
            const searchState = {...prevState.searchState};
            if (isGraphicalLocatorActive) {
                searchState.isExpressionsTemp = searchState.isExpressions;
                searchState.isExpressions = true;
            } else {
                searchState.visualQuery = null;
                searchState.visualId = null;
                searchState.isExpressions = searchState.isExpressionsTemp;
            }
            return {
                isGraphicalLocatorActive,
                searchState
            }
        });
    }

    render() {
        const {
            appClasses, classes, appStyle, editorIds, TopNavigationBarComponent
        } = this.props;
        const {
            gridLayouts, isDebugLoading, tabIndex, data, isNew, traceAvailable,
            autorunDelay, width, height, hoveredCellKey,
            isGraphicalLocatorActive, isAutoExpand, pointOfViewTiles, isPlaying,
            order, orderBy, timeFlow,
        } = this.state;
        //console.log('isAutoExpand',isAutoExpand,this.state);
        const rowHeight =
            Math.floor(height / gridLayoutFormatter.grid.rows[gridLayoutFormatter.currentBreakPoint]);
        gridLayoutFormatter.rowHeights[gridLayoutFormatter.currentBreakPoint] =
            rowHeight - appStyle.margin;
        // console.log('l', this.state.defaultRowsPerPage, this.state.rowsPerPage);
        if (isCompact) {
            return (
                <div className={appClasses.content}>
                    <PastebinContext.Provider
                        value={{
                            ...this.state,
                            handleChangePlaying: this.handleChangePlaying,
                            getSortInfo: this.getSortInfo,
                        }}>
                        {global.monaco && global.monaco.editor && isAutoExpand &&
                        <Drawer anchor={"bottom"} open={isAutoExpand}
                                onClose={this.handleChangeAutoExpand}>
                            <PointOfView monaco={global.monaco}
                                         tiles={pointOfViewTiles}/>
                        </Drawer>}
                        {TopNavigationBarComponent}
                        <Responsive
                            width={width}
                            breakpoints={gridLayoutFormatter.gridBreakpoints}
                            layouts={gridLayouts}
                            cols={gridLayoutFormatter.grid.cols}
                            // verticalCompact={true}
                            compactType={'vertical'}
                            autoSize={true}
                            margin={[appStyle.margin, appStyle.margin]}
                            containerPadding={[appStyle.margin, appStyle.margin]}
                            rowHeight={gridLayoutFormatter.rowHeights[gridLayoutFormatter.currentBreakPoint]}
                            onResizeStart={this.onResizeStart}
                            onResize={this.onResize}
                            onResizeStop={this.onResizeStop}
                            draggableHandle={`.${classes.draggable}`}
                            // onDragStart={this.onDragStart}
                            onDrag={this.onDrag}
                            onDragStop={this.onDragStop}
                            onLayoutChange={this.onLayoutChange}
                            onBreakpointChange={this.onBreakpointChange}
                        >
                            <Paper elevation={1}
                                   key="scriptContainer"
                                   onMouseEnter={event =>
                                       this.handleChangeHoveredCellKey(event, 'scriptContainer')}
                                   onMouseLeave={event =>
                                       this.handleChangeHoveredCellKey(event, null)}
                            >
                                <Editor editorId={editorIds['js']}
                                        observeMouseEvents
                                        observeLiveExpressions={true}
                                        updateMonacoEditorLayout={this.updateMonacoEditorLayout(editorIds['js'])}
                                />
                                {hoveredCellKey === 'scriptContainer' ?
                                    null : <LanguageJavaScriptIcon
                                        className={classes.icon}/>}
                            </Paper>
                            <Paper elevation={1}
                                   key="htmlContainer"
                                   onMouseEnter={event =>
                                       this.handleChangeHoveredCellKey(event, 'htmlContainer')}
                                   onMouseLeave={event =>
                                       this.handleChangeHoveredCellKey(event, null)}
                            >
                                <Editor editorId={editorIds['html']}
                                        updateMonacoEditorLayout={this.updateMonacoEditorLayout(editorIds['html'])}
                                />
                                {hoveredCellKey === 'htmlContainer' ?
                                    null : <LanguageHtml5Icon
                                        className={classes.icon}/>}
                            </Paper>
                            <Paper elevation={1}
                                   key="cssContainer"
                                   onMouseEnter={event =>
                                       this.handleChangeHoveredCellKey(event, 'cssContainer')}
                                   onMouseLeave={event =>
                                       this.handleChangeHoveredCellKey(event, null)}
                            >
                                <Editor editorId={editorIds['css']}
                                        updateMonacoEditorLayout={this.updateMonacoEditorLayout(editorIds['css'])}
                                />
                                {hoveredCellKey === 'cssContainer' ?
                                    null : <LanguageCss3Icon
                                        className={classes.icon}/>}
                            </Paper>
                            <Paper elevation={1}
                                   key="debugContainer"
                                   className={appClasses.container}
                                   onMouseEnter={event =>
                                       this.handleChangeHoveredCellKey(event, 'debugContainer')}
                                   onMouseLeave={event =>
                                       this.handleChangeHoveredCellKey(event, null)}
                            >
                                {/*<ScrollingList*/}
                                {/*    ScrollingListRef={this.debugScrollerRef}*/}
                                {/*    onScrollEnd={this.onScrollEnd}*/}
                                {/*    onScrollChange={this.onScrollChange}*/}
                                {/*    classes={appClasses.scroller}*/}
                                {/*    listLength={data.length}*/}
                                {/*    isRememberScrollingDisabled={isNew}*/}
                                {/*>*/}
                                <DebugContainer
                                    tabIndex={tabIndex}
                                    handleChangeTab={this.handleChangeTab}
                                    handleChangePlaying={this.handleChangePlaying}
                                    isPlaying={isPlaying}
                                />
                                {/*</ScrollingList>*/}

                                {isDebugLoading ?
                                    <span className={classes.loadingFeedback}>
                                        <MoreHorizIcon/>
                                    </span>
                                    : null}
                                {/*hoveredCellKey === 'debugContainer' ?
                                    null : <SlowMotionVideoIcon className={classes.icon}/>*/}
                            </Paper>
                            <Paper elevation={1}
                                   key="playgroundContainer"
                                   className={appClasses.container}
                                   onMouseEnter={event =>
                                       this.handleChangeHoveredCellKey(event, 'playgroundContainer')}
                                   onMouseLeave={event =>
                                       this.handleChangeHoveredCellKey(event, null)}
                            >
                                <Tooltip
                                    title={`${isGraphicalLocatorActive ?
                                        'Hide' : 'Show'} visual elements referenced in code`}
                                >
                                    <IconButton
                                        color={isGraphicalLocatorActive ? 'secondary' : 'inherit'}
                                        className={classes.locatorButton}
                                        raised="true"
                                        onClick={this.handleChangeGraphicalLocator}
                                    >
                                        <CodeTagsCheckIcon
                                            className={classes.locator}/>
                                    </IconButton>
                                </Tooltip>
                                <DragHandleIcon className={classes.draggable}/>
                                <Playground editorIds={editorIds}
                                            appClasses={appClasses}
                                            appStyle={appStyle}
                                            onResize={(onResize) => (this.onResize = onResize)}
                                            isGraphicalLocatorActive={isGraphicalLocatorActive}
                                            handleChangeGraphicalLocator={this.handleChangeGraphicalLocator}
                                />
                                {hoveredCellKey === 'playgroundContainer' ?
                                    null : <TvIcon className={classes.icon}/>}
                            </Paper>
                        </Responsive>
                    </PastebinContext.Provider>
                    {traceAvailable && <TraceControls
                        persistablePath={'traceControls'}
                        autorunDelay={autorunDelay}
                        handleChangeAutorunDelay={this.handleChangeAutorunDelay}
                    />}
                </div>
            );

        }
        return this.oldRender();
    }

    componentDidMount() {
        const {setGridLayoutCallbacks, pastebinConfigureLayout} = this.props;
        setGridLayoutCallbacks(this.resetGridLayout, this.getCurrentGridLayouts);

        pastebinConfigureLayout(this.restoreGridLayouts, this.getCurrentGridLayouts);
        this.onDebugContainerResizeEnd();
    }

    getSnapshotBeforeUpdate(prevProps, prevState) {
        const {tabIndex} = this.state;
        const scrollSnapshot = this.debugScrollerRefSnapshots[tabIndex];
        // if (tabIndex !== prevState.tabIndex) {
        //     if (scrollSnapshot) {
        //         return scrollSnapshot.scrollHeight - scrollSnapshot.scrollTop;
        //     } else {
        //         return this.debugScrollerRef.current.scrollHeight;
        //     }
        //
        // }
        return null;
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        this.handleAutomaticLayoutDebounced();
        if (snapshot !== null) {
            const list = this.debugScrollerRef.current;
            list.scrollTop = list.scrollHeight - snapshot;
        }
    }


}

Pastebin.propTypes = {
    classes: PropTypes.object.isRequired,
    editorIds: PropTypes.object.isRequired,
    setGridLayoutCallbacks: PropTypes.func.isRequired,
};

export default connect(null, mapDispatchToProps)(withStyles(styles)(SizeProvider(Pastebin)));
