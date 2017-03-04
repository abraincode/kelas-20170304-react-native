const HOST = 'http://10.0.3.2:3000';

import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  View,
  // Add more components
  Navigator, // Navigasi scene / activity
  Image,
  ScrollView, 
  RefreshControl, // FItur pull-down-to-refresh untuk ScrollView
  ListView, 
  TouchableHighlight, // Objek yang bisa di-tap
  ActivityIndicator, // Indikator spinner / loading
  StatusBar, // Status bar
  Button,
} from 'react-native';

export default class kelas_react_native extends Component { // Kelas utama
  constructor (props) {
    super(props)
    this.state = {  // Nilai-nilai state awal ditetapkan di sini
      defaultRoute : 'HomeScene', // Navigasi awal mengarah ke kelas HomeScene
    }
  }
  _renderScene (route, navigator) { // Fungsi untuk merender scene
    console.log(route);
    if (route && route.name == 'HomeScene') {
      return <HomeScene navigator={navigator} /> // navigator akan masuk ke this.props.navigator
    }
    if (route && route.name == 'ArticleScene') {
      return <ArticleScene navigator={navigator} id={route.id}/> // Selain navigator, id akan masuk ke this.props.id
    }
  }
  render () {
    return (
      <Navigator
        initialRoute={{name : this.state.defaultRoute }} // Tetapkan route pertama, diambil dari baris 24
        renderScene={this._renderScene} // Fungsi render scene, ke baris 28
      />
    )
  }
}

const HomeScene = React.createClass({ // Kelas HomeScene, menampilkan daftar artikel
  getInitialState() {
    var ds = new ListView.DataSource({ rowHasChanged : (r1, r2) => r1 !== r2 }); // Inisiasi dataSource untuk ListView
    return {  // Tetapkan nilai awal untuk state
      title : 'Wikipedia Featured',
      list : ds.cloneWithRows([]), // daftar artikel kosong, akan di-load di componentDidMount
      spinner : false,
    }
  },
  componentDidMount () { // Fungsi yang dijalankan setelah komponen dirender 
    this._fetch(); // Tarik data
  },
  componentWillMount () { // Fungsi yang dijalankan sebelum komponen dirender
  },
  _fetch() { // Fungsi untuk menarik data daftar artikel
    this.setState({ spinner : true }); // Tampilkan spinner
    fetch(HOST + '/articles')
    .then((result) => {
      console.log(result);
      this.setState({ spinner : false }); // Sembunyikan spinner
      var ds = new ListView.DataSource({ rowHasChanged : (r1, r2) => r1 !== r2 });
      var body = JSON.parse(result._bodyInit); // Parse JSON ke objek.
      this.setState({ list : ds.cloneWithRows(body) }); // Masukkan data ke state list
    })
  },
  _onTap (id) { // Fungsi navigasi ke halaman artikel
    if (!id) { // Abaikan jika tidak ada parameter
      return;
    }
    this.props.navigator.push({name : 'ArticleScene', id : id}); // Menambahkan ArticleScene ke stack navigasi, halaman pindah ke ArticleScene
  },
  render () {
    return (
      <View>
        <StatusBar backgroundColor="red"/>
        <View style={styles.topBar} // Style dapat dipanggil
        > 
          <Text // Tampilkan judul
            style={{alignSelf:'center', color:'white'}} // Style juga dapat ditulis langsung dalam bentuk objek
          > 
            {this.state.title} 
          </Text> 
        </View> 
        <ScrollView
          refreshControl={
            <RefreshControl
              refreshing={this.state.spinner}
              onRefresh={this._fetch} // Pasang fungsi penarik data di sin
            />
          }
        >
          <ListView
            dataSource={this.state.list} // Sumber data
            enableEmptySections={true}
            renderRow={(rowData) => // Iterasi untuk setiap item
              // Panggil kelas ArticleItem
              // props yang dikirim adalah onTap (fungsi navigasi) dan data (objek item)
              <ArticleItem onTap={this._onTap} data={rowData} /> 
            }
          >
          </ListView>
        </ScrollView>
      </View>
    )
  }
})

const ArticleItem = React.createClass({ // Kelas ArticleItem, berisi komponen yang menampilkan gambar dan judul artikel, dapat di-tap.
  getInitialState() {
    return {
    }
  },
  render () {
    return (
      <TouchableHighlight 
        onPress={() => this.props.onTap(this.props.data.id) } // fungsi navigasi ini larinya ke fungsi onTap milik HomeScene
      > 
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
    this._fetch(this.props.id); // Tarik data 
  },
  componentWillMount () {
  },
  _fetch(id) { // Fungsi untuk menarik data berasarkan ID
    fetch(HOST + '/articles?id=' + id)
    .then((result) => {
      this.setState({data : JSON.parse(result._bodyInit) }); // Masukkan hasilnya ke state data
    })
  },
  _onTap() {
    return // Do nothing
  },
  _back () { // Fungsi navigasi kembali
    this.props.navigator.pop(); // Lepas scene terakhir dari stack navigasi, akan kembali ke halaman sebelumnya
  },
  render () {
    return (
      <View>
        <StatusBar backgroundColor="red"/>
        <View style={{backgroundColor:'red', height:40}}>
          <Text style={{alignSelf:'center', color:'white'}}>{this.state.title}</Text>
        </View> 
        <View style={{backgroundColor:'red', position:'absolute', top:0, left:0}} >
          <Button title="back" underlayColor="red" onPress={this._back} color="red"/>
        </View>
        <ScrollView>
          {/* Panggil kelas ArticleItem, oper objek data */}
          <ArticleItem onTap={this._onTap} data={this.state.data} /> 
          <Text style={styles.bodyText}>{this.state.data.body}</Text>
        </ScrollView>
      </View>
    )
  }
})

const styles = StyleSheet.create({ // Styles
  topBar : {
    backgroundColor:'red', 
    height:40
  },
  bodyText : {
    margin: 15,
  }
});

AppRegistry.registerComponent('kelas_react_native', () => kelas_react_native);
