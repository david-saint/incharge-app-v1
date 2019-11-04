import React, { Component } from 'react';
import AppStyles from '@/config/styles';
import AppMetrics from '@/config/metrics';
import  type { FormProps } from 'redux-form';
import { Field, reduxForm } from 'redux-form';
import Input from '@/components/reuseable/Input';
import Picker from '@/components/reuseable/Picker';
import {
  Menu,
  Button,
  Surface,
} from 'react-native-paper';
import {
  Text,
  View,
  Platform,
  StyleSheet,
  LayoutAnimation,
} from 'react-native';

import { sectors, religions } from './data';

const styles = StyleSheet.create({
  container: {
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
  },
  fieldControl: {
    width: '100%',
    marginVertical: 15,
  },
  actionButton: {
    height: 40,
    fontSize: 12,
    width: '100%',
    lineHeight: 40,
    borderRadius: 0,
    marginBottom: 24,
    fontFamily: AppStyles.fonts.SECOND_FONT_BOLD,
  },
  actionButtonContent: {
    fontSize: 12,
    lineHeight: 20,
    color: AppStyles.colors.lightWhite,
    fontFamily: AppStyles.fonts.SECOND_FONT_BOLD,
    paddingTop: Platform.OS === 'ios' ? 2 : 0,
  },
  actionText: {
    fontSize: 14,
    lineHeight: 25,
    color: '#303030',
    fontFamily: AppStyles.fonts.FONT_BOLD,
  },
  isCompact: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  errors: {
    fontSize: 11,
    marginTop: 5,
    color: '#B00020',
    paddingHorizontal: 12,
    fontFamily: AppStyles.fonts.FONT_BOLD,
  },
  filterContainer: {
    padding: 4,
    elevation: 5,
    marginTop: 0,
    minWidth: 220,
    borderRadius: 4,
  },
  filterRow: {
    height: 40,
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  filterLabel: {
    padding: 5,
    fontSize: 11,
    color: AppStyles.colors.inactiveGreyColor,
    fontFamily: AppStyles.fonts.SECOND_FONT_LIGHT,
  },
  listContainer: {
    height: 135,
    width: '100%',
    marginBottom: 15,
    backgroundColor: 'transparent',
  },
  listItem: {
    flex: 1,
    padding: 20,
    elevation: 4,
    borderRadius: 10,
    flexDirection: 'row',
    marginHorizontal: 10,
    marginVertical: 10,
    alignItems: 'center',
    width: AppMetrics.width - 90,
    justifyContent: 'space-between',
    backgroundColor: AppStyles.colors.white,
  },
  fleft: {
    alignItems: 'flex-start',
  },
  changeUnitText: {
    fontSize: 10,
    textTransform: 'uppercase',
  },
  inlineField: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  f1: {
    flex: 1,
    marginHorizontal: 8,
  },
});

type Props = {} & FormProps;

class MoreInformationForm extends Component<Props> {
  state = {
    mode: 'kg',
    heightMode: 'cm',
    menuVisible: false,
    isChristian: false,
    unitChanging: false,
    perPageVisible: false,
  }

  _checkReligion = (e, value) => {
    this.setState({
      isChristian: value === 'CHRISTIANITY',
    });
    LayoutAnimation.configureNext(LayoutAnimation.Presets.spring);
  }

  render() {
    const {
      color,
      error,
      onNext,
      levels,
      submitting,
      handleSubmit,
    } = this.props;
    const {
      mode,
      heightMode,
      isChristian,
      unitChanging,
    } = this.state;
    return (
      <View style={styles.container}>
        <View style={{ ...styles.fieldControl, ...styles.fleft }}>
          {
            !unitChanging && (
              <Button
                mode="text"
                icon="timeline"
                onPress={() => this.setState({ unitChanging: true })}>
                <Text style={styles.changeUnitText}>Change Units</Text>
              </Button>
            )
          }
          {
            unitChanging && (
              <Surface style={styles.filterContainer}>
                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Weight Unit</Text>
                  <View style={{ flexDirection: 'row' }}>
                    <Menu
                      visible={this.state.menuVisible}
                      onDismiss={() => this.setState({ menuVisible: false })}
                      anchor={
                        <Button
                          type="text"
                          onPress={() => this.setState({ menuVisible: true })}>
                          <Text style={styles.changeUnitText}>{this.state.mode}</Text>
                        </Button>
                      }
                    >
                      <Menu.Item
                        title="KG"
                        onPress={() => this.setState({ mode: 'kg', menuVisible: false })}
                      />
                      <Menu.Item
                        title="LBS"
                        onPress={() => this.setState({ mode: 'lbs', menuVisible: false })}
                      />
                      <Menu.Item
                        title="ST"
                        onPress={() => this.setState({ mode: 'st', menuVisible: false })}
                      />
                    </Menu>
                  </View>
                </View>

                <View style={styles.filterRow}>
                  <Text style={styles.filterLabel}>Height Unit</Text>
                  <Menu
                      visible={this.state.perPageVisible}
                      onDismiss={() => this.setState({ perPageVisible: false })}
                      anchor={
                        <Button
                          type="text"
                          onPress={() => this.setState({ perPageVisible: true })}>
                          <Text style={styles.changeUnitText}>{this.state.heightMode}</Text>
                        </Button>
                      }
                    >
                      <Menu.Item
                        title="cm"
                        onPress={() => this.setState({ heightMode: 'cm', perPageVisible: false })}
                      />
                      <Menu.Item
                        title="ft"
                        onPress={() => this.setState({ heightMode: 'ft', perPageVisible: false })}
                      />
                      <Menu.Item
                        title="m"
                        onPress={() => this.setState({ heightMode: 'm', perPageVisible: false })}
                      />
                    </Menu>
                </View>
              </Surface>
            )
          }
        </View>
        <View style={styles.fieldControl}>
          {
            heightMode !== 'ft' ? (
              <Field
                label="height"
                name={'height'}
                placeholder={`Height (in ${heightMode.toUpperCase()})`}
                component={Input}
                autoCapitalize="none"
                keyboardType="decimal-pad"
                />
            ) : (
              <View style={styles.inlineField}>
                <View style={styles.f1}>
                  <Field
                    label="height"
                    name={'height'}
                    placeholder="FT"
                    component={Input}
                    autoCapitalize="none"
                    keyboardType="number-pad"
                    />
                </View>
                <View style={styles.f1}>
                  <Field
                    placeholder="IN"
                    component={Input}
                    label="height-inches"
                    autoCapitalize="none"
                    name={'height-inches'}
                    keyboardType="number-pad"
                    />
                  </View>
              </View>
            )
          }
        </View>
        <View style={styles.fieldControl}>
          <Field
            label="weight"
            name={'weight'}
            placeholder={`Weight (in ${mode.toUpperCase()})`}
            component={Input}
            autoCapitalize="none"
            keyboardType="numeric"
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            label="occupation"
            name={'occupation'}
            placeholder="Occupation"
            component={Input}
            autoCapitalize="words"
            />
        </View>
        <View style={styles.fieldControl}>
          <Field
            items={religions}
            label="religion"
            name={'religion'}
            component={Picker}
            onChange={this._checkReligion}
            placeholder={{ label: 'Religion' }}
            validate={[]}
            />
        </View>
        {
          isChristian && (
            <View style={styles.fieldControl}>
              <Field
                items={sectors}
                label="religion sector"
                name={'religion_sector'}
                placeholder={{ label: 'Religious Sector' }}
                component={Picker}
                validate={[]}
                />
            </View>
          )
        }
        <View style={styles.fieldControl}>
          <Field
            items={levels}
            label="education level"
            name={'education_level'}
            placeholder={{ label: 'Education Level' }}
            component={Picker}
            />
        </View>
        <Text style={styles.errors}>{error}</Text>
        <View style={styles.fieldControl}>
          <Button
            mode="contained"
            uppercase={true}
            loading={submitting}
            onPress={handleSubmit(onNext)}
            style={[styles.actionButton, {
              backgroundColor: color || AppStyles.colors.accentColor,
            }]}
            accessibilityLabel="Done"
            font={AppStyles.fonts.SECOND_FONT_SEMIBOLD}
            disabled={submitting}
            contentStyle={styles.actionButtonContent}>
            {
              submitting || <Text style={styles.actionButtonContent}>DONE</Text>
            }
          </Button>
        </View>
      </View>
    );
  }
}

export default reduxForm({
  form: 'profiling-more-info',
  onSubmitSuccess: (result, dispatch, props) => {
    props.onNextSuccess();
  },
})(MoreInformationForm);
