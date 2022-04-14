import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle , TextStyle ,View ,ImageStyle} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text,Header,AutoImage as Image } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import dayjs from 'dayjs'

const FULL: ViewStyle = { flex: 1 }
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 24,
  fontWeight: "bold",
  textAlign: "left",
  margin:10
}
const IMAGE: ImageStyle = {
  margin:10,
  flexDirection:'row',
  justifyContent:'center',
  height: 200,
  width: 390,
}
const auth_title: TextStyle = {
  fontSize: 13,
  textAlign: "left",
  margin:10
}
const Sub_title: TextStyle = {
  fontSize: 16,
  fontWeight:'600',
  textAlign: "left",
  margin:10
}
const authordate : TextStyle ={
  flexDirection:'row',
  justifyContent:'space-between'
}
const content: TextStyle = {
  fontSize: 16,
  fontWeight:'600',
  textAlign: "left",
  margin:10
}

export const BlogDetailScreen: FC<StackScreenProps<NavigatorParamList, "blogDetail">> = observer(function BlogDetailScreen(props,navigation) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const goBack = () => props.navigation.goBack()
  const item = props.route.params
  console.log('asdsad',item)
  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <View style={FULL}>
      <Screen style={ROOT} preset="scroll">
        <Header leftIcon="back" onLeftPress={goBack} style={HEADER} />
        <Text style={HEADER_TITLE}>{item.title}</Text>
        <Image source={{ uri: item.photo }} style={IMAGE} />
        <View style={{ height: 1, backgroundColor: "white", margin: 10 }} />
        <View style={authordate}>
          <Text style={auth_title}>
            {"Author : "}
            {item.author}
          </Text>
          <Text style={auth_title}>{dayjs(item.create_at).format("DD MMMM YYYY")}</Text>
        </View>
        <Text style={{ marginLeft: 10 }}>{item.tag}</Text>
        <Text style={Sub_title}>{item.subTitle}</Text>
        <Text style={Sub_title}>{item.content}</Text>
      </Screen>
    </View>
  )
})
