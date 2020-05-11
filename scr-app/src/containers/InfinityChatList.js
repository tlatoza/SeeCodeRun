import React from "react";
import PropTypes from 'prop-types';
import {FixedSizeList as List} from "react-window";
import InfiniteLoader from "react-window-infinite-loader";
import Tooltip from '@material-ui/core/Tooltip';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

export default function InfinityChatList(
    {
        classes, width, height, chatUserId,
        messages, isItemLoaded, loadMoreItems,
        getFormattedTime, getMessageOwner, getUserColor, chatListRef
    }
) {
    let prevChatUserId = null;
    const Row = ({index, style}) => {
        const message = messages[index];

        const skipInfo = index && message.chatUserId === messages[index - 1].chatUserId;
        const skipTime = index && ((new Date(message.timestamp)).getTime()
            - (new Date(messages[index - 1].timestamp).getTime())) < 30000;
        const messageOwner = getMessageOwner(message.chatUserId);
        const listItemAvatarStyle = {
            visibility: (prevChatUserId === message.chatUserId
                || chatUserId === message.chatUserId) ?
                "hidden" : "visible",
        };
        prevChatUserId = message.chatUserId;

        return (
            <div style={style}>
                <ListItem
                    key={message.key}
                    button={false}
                    disableGutters
                >
                    <Tooltip title={messageOwner || 'unknown'}>
                        <ListItemAvatar style={listItemAvatarStyle}>
                            {chatUserId === message.chatUserId || skipInfo ?
                                <Avatar/>
                                : <Avatar
                                    style={{
                                        backgroundColor: getUserColor(message.chatUserId)
                                    }}
                                >
                                    {messageOwner ? messageOwner[0].toUpperCase() : '?'}
                                </Avatar>
                            }
                        </ListItemAvatar>
                    </Tooltip>
                    {chatUserId === message.chatUserId ?
                        <ListItemSecondaryAction>
                            <ListItemText
                                primary={message.text}
                                secondary={skipTime ?
                                    null : getFormattedTime(message.timestamp)}
                            />
                        </ListItemSecondaryAction>
                        : <ListItemText
                            primary={message.text}
                            secondary={
                                skipTime ?
                                    null : getFormattedTime(message.timestamp)
                            }
                        />
                    }
                </ListItem>
            </div>
        );

    };

    return (
        <InfiniteLoader
            ref={chatListRef}
            isItemLoaded={isItemLoaded}
            itemCount={messages.length}
            loadMoreItems={loadMoreItems}
        >
            {({onItemsRendered, ref}) => (
                <List
                    width={width}
                    height={height}
                    itemCount={messages.length}
                    itemSize={60}
                    onItemsRendered={onItemsRendered}
                    ref={ref}
                    className={classes.root}
                    overscanCount={10}
                >
                    {Row}
                </List>
            )
            }
        </InfiniteLoader>
    );
}
InfinityChatList.propTypes = {
    width: PropTypes.number.isRequired,
    height: PropTypes.number.isRequired,
    messages: PropTypes.array.isRequired,
    getUserColor: PropTypes.func.isRequired,
    getFormattedTime: PropTypes.func.isRequired,
    getMessageOwner: PropTypes.func.isRequired,
    chatListRef: PropTypes.object.isRequired,
    classes: PropTypes.object.isRequired,
};
