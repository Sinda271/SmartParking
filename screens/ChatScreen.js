import React, {useState, useEffect, useCallback} from 'react';
import {View, StyleSheet, Image} from 'react-native';
import {Bubble, GiftedChat, Send} from 'react-native-gifted-chat';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {Container} from 'native-base';
import {TouchableOpacity} from 'react-native-gesture-handler';
import axios from 'axios';
import core from '../core';
import {URL, AdminChatScreenRoute, AdminReplyRoute} from '../core/routes';
const ChatScreen = props => {
  const [messages, setMessages] = useState([]);
  const cin = props.route.params.cin;

  const getAdminChatScreen = async () => {
    try {
      axios({
        method: 'post',
        url: URL + AdminChatScreenRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          cin: cin,
        },
      }).then(response => {
        console.log(response);
        setMessages(response);
      });
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getAdminChatScreen();
  }, []);

  const onSend = useCallback(async (msg = []) => {
    setMessages(previousmsg => GiftedChat.append(msg, previousmsg));

    try {
      axios({
        method: 'post',
        url: URL + AdminReplyRoute,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        data: {
          reply: msg,
          cin: cin,
        },
      }).then(response => {
        console.log(response);
      });
    } catch (error) {
      console.error(error);
    }
  }, []);

  const renderSend = props => {
    return (
      <Send {...props}>
        <View>
          <MaterialCommunityIcons
            name="send-circle"
            style={styles.sendicon}
            size={32}
            color="#3891c0"
          />
        </View>
      </Send>
    );
  };

  const renderBubble = props => {
    return (
      <Bubble
        {...props}
        wrapperStyle={{
          left: {
            backgroundColor: '#DCDCDC',
            marginBottom: 10,
          },
          right: {
            backgroundColor: core.theme.colors.primary,
            marginBottom: 10,
          },
        }}
        textStyle={{
          left: {
            color: core.theme.colors.text,
          },
          right: {
            color: core.theme.colors.surface,
          },
        }}
      />
    );
  };

  const scrollToBottomComponent = () => {
    return <FontAwesome name="angle-double-down" size={22} color="#333" />;
  };

  return (
    <Container style={styles.container}>
      <TouchableOpacity style={styles.margin} onPress={props.navigation.goBack}>
        <Image style={styles.image1} source={core.backarrow} />
      </TouchableOpacity>
      <GiftedChat
        inverted={false}
        messages={messages}
        onSend={msg => onSend(msg)}
        user={{
          _id: 13013425,
          name: 'Sinda Besrour',
        }}
        renderBubble={renderBubble}
        alwaysShowSend
        renderSend={renderSend}
        scrollToBottom
        scrollToBottomComponent={scrollToBottomComponent}
      />
    </Container>
  );
};

export default ChatScreen;

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
  },
  image1: {
    width: 30,
    height: 30,
    marginStart: 30,
    marginTop: 35,
  },
  margin: {marginBottom: 10},
  sendicon: {marginBottom: 5, marginRight: 5},
});
