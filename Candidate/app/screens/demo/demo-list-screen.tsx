import React, { useEffect, FC, useState } from "react"
import { FlatList, TextStyle, View, ViewStyle, ImageStyle,TextInput,Modal,TouchableOpacity } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { observer } from "mobx-react-lite"
import { Header, Screen, Text, AutoImage as Image, GradientBackground } from "../../components"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import { NavigatorParamList } from "../../navigators"
import { SearchBar } from '@rneui/themed';
import {LoadingScreen} from '../loading/loading-screen'
import dayjs from "dayjs";

const FULL: ViewStyle = {
  flex: 1,
}
const CONTAINER: ViewStyle = {
  backgroundColor: color.transparent,
}
const Expired : ViewStyle={
  justifyContent:"flex-end",
  flexDirection:'row'
}

const authorText : ViewStyle={
  flexDirection:'column',
  marginLeft: 10,
  width:250
}


const HEADER: TextStyle = {
  color:'black',
  margin:10,
  borderRadius:20,
  backgroundColor:'white',
  paddingBottom: spacing[4] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 12,
  fontWeight: "bold",
  letterSpacing: 1.5,
  lineHeight: 15,
  textAlign: "center",
}
const LIST_CONTAINER: ViewStyle = {
  alignItems: "center",
  flexDirection: "row",
  padding: 10,
}
const IMAGE: ImageStyle = {
  borderRadius: 35,
  height: 65,
  width: 65,
}
const LIST_TEXT: TextStyle = {
  marginLeft: 10,
}
const FLAT_LIST: ViewStyle = {
  paddingHorizontal: spacing[4],
}

export const DemoListScreen: FC<StackScreenProps<NavigatorParamList, "candidate">> = observer(
  ({ navigation }) => {
    const goBack = () => navigation.goBack()

    const { candidateStore,appStore,blogStore,userStore } = useStores()
    const { candidate,getData } = candidateStore
    const {blog,getDataBlog}= blogStore
    
    // const [loading, setLoading] = useState("");
    // const [search, setSearch] = useState("");
    const [list, setList] = useState([]);
    const [listBlog, setListBlog] = useState([]);
    
    const updateSearch = (search : string) => {
      const temp = getData(search)
      const tempBlog =getDataBlog(search)
      setList(temp)
      setListBlog(tempBlog)
    };
    
    useEffect(() => {
      candidateStore.getCandidate().then(()=>{
        setList(candidateStore.getData(''))
        // console.log('can',candidateStore.getData(''))
      })
      userStore.getUser().then((item)=>{
        // console.log('userssss',item)
      })
      blogStore.getBlog().then(()=>{
        setListBlog(blogStore.getDataBlog(''))
      })
      
    }, [])

    return (
      <>
        {appStore.isLoading ? (
          <LoadingScreen />
        ) : (
          <View testID="DemoListScreen" style={FULL}>
            <GradientBackground colors={["#422443", "#281b34"]} />
            <Screen style={CONTAINER} preset="fixed" backgroundColor={color.transparent}>
              <TextInput style={HEADER} placeholder="Type Here..." onChangeText={updateSearch} />
              {/* <Header
            headerText="Candidate"
            // leftIcon="back"
            // onLeftPress={goBack}
            style={HEADER}
            titleStyle={HEADER_TITLE}
          /> */}
              <FlatList
                ListFooterComponent={
                  <FlatList
                    contentContainerStyle={FLAT_LIST}
                    data={[...listBlog]}
                    renderItem={({ item }) => (
                      <TouchableOpacity
                      onPress={()=> navigation.push('blogDetail',item)}
                      >
                        <View>
                          <View style={LIST_CONTAINER}>
                            <Image source={{ uri: item.photo }} style={IMAGE} />
                            <View style={authorText}>
                              <Text style={LIST_TEXT}>{item.author}</Text>
                              <Text style={authorText}>{item.title}</Text>
                            </View>
                          </View>
                        </View>
                      </TouchableOpacity>
                    )}
                  />
                }
                contentContainerStyle={FLAT_LIST}
                data={[...list]}
                keyExtractor={(item) => String(item.id)}
                renderItem={({ item }) => (
                  <TouchableOpacity onPress={()=>navigation.navigate('candidateDetail',item)}>
                    <View>
                      <View style={LIST_CONTAINER}>
                        <Image source={{ uri: item.photo }} style={IMAGE} />
                        <Text style={LIST_TEXT}>{item.name}</Text>
                      </View>
                      <View style={Expired}>
                        <Text>
                          {"Expired :"}
                          {dayjs(item.expired).format("DD MMMM YYYY")}
                        </Text>
                      </View>
                    </View>
                  </TouchableOpacity>
                )}
              />
            </Screen>
          </View>
        )}
      </>
    )
  },
)
