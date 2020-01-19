import React, { Component } from 'react'
import { Text, View, FlatList, ActivityIndicator } from 'react-native'
import { connect } from 'react-redux'
import _ from 'lodash'

// Redux
import NewsActions from '../Redux/NewsRedux'

// Components

// Style

export class Home extends Component {
  componentDidMount () {
    this.props.newsRequest()
  }

  render () {
    const { articles, news, newsRequest } = this.props
    return (
      <View style={{ padding: 20, flex: 1 }}>
        {news.fetching
          ? <ActivityIndicator size='large' />
          : <FlatList
            data={articles}
            onRefresh={() => newsRequest()}
            refreshing={false}
            style={{ backgroundColor: 'white', flex: 1 }}
            keyExtractor={(item, index) => `articles flatlist ${index}`}
            renderItem={({ item }) => <Text>{item.title}</Text>}
          />
        }
      </View>
    )
  }
}

const mapStateToProps = (state) => ({
  news: state.news,
  articles: _.get(state.news.data, 'articles')
})

const mapDispatchToProps = (dispatch) => ({
  newsRequest: (search) => dispatch(NewsActions.newsRequest(search))
})

export default connect(mapStateToProps, mapDispatchToProps)(Home)
