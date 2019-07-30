import React, { Component } from 'react';
import PropTypes from 'prop-types';
import AppStyles from '@/config/styles';
import { SETTINGS } from '@/navigation/screens';
import BackArrow from '@/components/svg/BackArrowSVG';
import Icon from 'react-native-vector-icons/FontAwesome5';
import {
  List,
  Title,
  Appbar,
  Paragraph,
  Subheading,
} from 'react-native-paper';
import {
  View,
  StatusBar,
  ScrollView,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';

import styles from './styles';

export default class FaQScreen extends Component {
  static navigationOptions = {
    title: 'FAQs',
    activeTintColor: AppStyles.colors.primaryColor,
    tabBarIcon: ({ focused }) => {
      if (focused) {
        return <Icon name="question" size={25} />;
      }
      return <Icon name="question" size={20} color={AppStyles.colors.inactiveGreyColor} />;
    },
  }

  state = {
    active: null,
  }

  componentDidMount() {
    this.props.getFaqGroups();
  }

  _renderContent = () => {
    const { faq: { groups }, getFaqGroupContent } = this.props;

    if (this.state.active === null) {
      return (
        <ScrollView>
          <List.Section>
            <List.Subheader>Frequently Asked Questions</List.Subheader>
            {
             groups && groups.map(group => (
              <List.Accordion
                key={group.id}
                title={group.name}
                onPress={() => getFaqGroupContent(group.id)}
                left={props => <List.Icon {...props} icon="folder" />}>
                {
                  this.props.faq[group.id]
                    ? this.props.faq[group.id].map((c, i) => (
                      <List.Item
                        key={i}
                        title={c.title}
                        onPress={() => this.setState({ active: [group.id, i] })} />
                    ))
                    : (
                      <ActivityIndicator
                        size="small"
                        color={AppStyles.colors.primaryColor} />
                    )
                }
              </List.Accordion>
             ))
           }
         </List.Section>
        </ScrollView>
      );
    }

    const { active } = this.state;
    const group = this.props.faq[active[0]][active[1]];
    return (
      <ScrollView
        style={{ padding: 15 }}>
        <TouchableOpacity
          style={{ padding: 0, paddingVertical: 15 }}
          onPress={() => this.setState({ active: null })}>
          <BackArrow />
        </TouchableOpacity>
        <Title
          style={{
            margin: 15,
            fontSize: 24,
            textAlign: 'center',
            fontFamily: AppStyles.fonts.FONT_LIGHT,
          }}>
          {group.title}
        </Title>
        {
          group.content.map((content, index) => (
            <View
              key={index}
              style={{
                marginVertical: 15,
              }}>
              <Subheading
                style={{
                  lineHeight: 26,
                  fontFamily: AppStyles.fonts.SECOND_FONT_BOLD,
                }}>
                {content.title}
              </Subheading>
              <Paragraph
                style={{
                  lineHeight: 26,
                  fontFamily: AppStyles.fonts.SECOND_FONT_REGULAR,
                }}>
                {content.values.join('\n')}
              </Paragraph>
            </View>
          ))
        }
      </ScrollView>
    );
  }

  render() {
    const { navigation } = this.props;
    return (
      <View style={styles.container}>
        <StatusBar barStyle="dark-content" />
        <Appbar.Header
          dark={false}
          style={{ elevation: 5 }}
          theme={{
            colors: {
              primary: AppStyles.colors.white,
              text: AppStyles.colors.mateBlack,
            },
            fonts: {
              medium: AppStyles.fonts.FONT_SEMIBOLD,
              regular: AppStyles.fonts.FONT_REGULAR,
            },
          }}>
          <Appbar.Content
            title="FAQs"
            titleStyle={{
              textAlign: 'center',
              color: AppStyles.colors.mateBlack,
              fontFamily: AppStyles.fonts.FONT_SEMIBOLD,
            }}
          />
          <Appbar.Action icon="more-vert" onPress={() => navigation.navigate(SETTINGS)} />
        </Appbar.Header>
        <View style={styles.mainContainer}>
          {this._renderContent()}
        </View>
      </View>
    );
  }
}

FaQScreen.propTypes = {
  faq: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  navigation: PropTypes.object.isRequired,
  getFaqGroups: PropTypes.func.isRequired,
  getFaqGroupContent: PropTypes.func.isRequired,
};
