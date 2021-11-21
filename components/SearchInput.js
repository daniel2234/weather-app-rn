import React from "react";
import {StyleSheet, TextInput, View} from 'react-native';

export default class SearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      text: '',
    }
  }
  //event handler that tracks what your typing in
  handleChangeText= (text) => {
    console.log(text);
      this.setState({text})
  }
  //
  handleSubmitEditing = () => {
    const { onSubmit } = this.props;
    const { text } = this.state;

    if(!text) return;

    onSubmit(text);
    this.setState({ text: ''})
  }

  render() {
    const { placeholder } = this.props;
    const { text } = this.state;
    console.log(this.props, 'this is being called.');
    return (
      <View style={styles.container}>
        <TextInput
          autoCorrect={false}
          value={text}
          placeholder={placeholder}
          placeholderTextColor="white"
          underlineColorAndroid="transparent"
          style={styles.textInput}
          clearButtonMode="always"
          onChangeText={this.handleChangeText}
          onSubmitEditing={this.handleSubmitEditing}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    height: 40,
    marginTop: 20,
    backgroundColor: '#666',
    width:200,
    marginHorizontal: 40,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  textInput: {
    flex:1,
    color:'white'
  }
})