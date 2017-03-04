const HOST = 'http://192.168:1234';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  Navigator,
  Image,
  ScrollView,
  RefreshControl,
  ListView,
  TouchableHighlight,
  ActivityIndicator,
  StatusBar,
  Button,
} from 'react-native';

export default class kelas_react_native extends Component {
  constructor (props) {
    super(props)
    this.state = {
      defaultRoute : 'HomeScene',
    }
  }
  _renderScene (route, navigator) {
    if (route.name == 'HomeScene') {
      return <HomeScene navigator={navigator} />
    }
    if (route.name == 'ArticleScene') {
      return <ArticleScene navigator={navigator} id={route.id}/>
    }
  }
  render () {
    return (
      <Navigator
        initialRoute={{name : this.state.defaultRoute }}
        renderScene={this._renderScene}
      />
    )
  }
}

const HomeScene = React.createClass({
  getInitialState() {
    var ds = new ListView.DataSource({ rowHasChanged : (r1, r2) => r1 !== r2 });
    return {
      title : 'Wikipedia Featured',
      list : ds.cloneWithRows([]),
      spinner : false,
    }
  },
  componentDidMount () {
    this._fetch();
  },
  componentWillMount () {
  },
  _fetch() {
    this.setState({ spinner : true });
    fetch(HOST + '/articles')
    .then((result) => {
      this.setState({ spinner : false });
      var ds = new ListView.DataSource({ rowHasChanged : (r1, r2) => r1 !== r2 });
      var body = JSON.parse(result._bodyInit);
      /* this.state.list = ds.cloneWithRows(body); */
      this.setState({ list : ds.cloneWithRows(body) });
    })
  },
  _onTap (id) {
    if (!id) {
      return;
    }
    this.props.navigator.push({name : 'ArticleScene', id : id})
  },
  _onTapWithParams (test) {
    this.props.navigator.push({name : 'ArticleScene'})
  },
  render () {
    return (
      <View>
        <StatusBar backgroundColor="red"/>
        <View style={styles.topBar}>
          <Text style={{alignSelf:'center', color:'white'}}>Wikipedia Featured</Text>
        </View> 
        <Text>{this.state.title}</Text>
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.spinner}
              onRefresh={this._onTap}
            />
          }
        >
          <ListView
            dataSource={this.state.list}
            enableEmptySections={true}
            renderRow={(rowData) =>
              <ArticleItem onTap={this._onTap} data={rowData} />
            }
          >
          </ListView>
        </ScrollView>
      </View>
    )
  }
})

const ArticleItem = React.createClass({
  getInitialState() {
    return {
    }
  },
  componentDidMount () {
  },
  componentWillMount () {
  },
  render () {
    return (
      <TouchableHighlight onPress={() => this.props.onTap(this.props.data.id) }>
        <View>
          <Image source={{uri : HOST + '/image/' + this.props.data.id}} style={{height:300}}/>
          <Text style={{marginBottom:15}}>{this.props.data.title}</Text>
        </View>
      </TouchableHighlight>
    )
  }
})

const ArticleScene = React.createClass({
  getInitialState() {
    return {
      title : 'Article',
      data : { id : 0 },
    }
  },
  componentDidMount () {
    this._fetch(this.props.id);
  },
  componentWillMount () {
  },
  _fetch(id) {
    fetch(HOST + '/articles?id=' + id)
    .then((result) => {
      this.setState({data : JSON.parse(result._bodyInit) }); 
    })
  },
  _back () {
    this.props.navigator.pop();
  },
  render () {
    return (
      <View>
        <StatusBar backgroundColor="red"/>
        <View style={{backgroundColor:'red', height:40}}>
          <Text style={{alignSelf:'center', color:'white'}}>Article</Text>
        </View> 
        <View style={{backgroundColor:'red', position:'absolute', top:0, left:0}} >
          <Button title="back" underlayColor="red" onPress={this._back} color="red"/>
        </View>
        <ScrollView>
          <ArticleItem onTap={this._onTap} data={this.state.data} />
          <Text style={styles.bodyText}>{this.state.data.body}</Text>
        </ScrollView>
      </View>
    )
  }
})

const styles = StyleSheet.create({
  topBar : {
    backgroundColor:'red', 
    height:40
  },
  bodyText : {
    margin: 15,
  }
});

AppRegistry.registerComponent('kelas_react_native', () => kelas_react_native);
