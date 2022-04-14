import React, { FC,useEffect,useState } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle , TextStyle ,View ,ImageStyle ,Linking} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text,Header,AutoImage as Image, Button } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color, spacing } from "../../theme"
import { useStores } from "../../models"
import {LoadingScreen} from '../loading/loading-screen'
import dayjs from 'dayjs'

const FULL: ViewStyle = { flex: 1 }
const ROOT: ViewStyle = {
  backgroundColor: color.palette.black,
}
const headerWrap :ViewStyle ={
  justifyContent:'center',
  alignItems:'center',
  flexDirection:'column',
}
const HEADER: TextStyle = {
  paddingBottom: spacing[5] - 1,
  paddingHorizontal: spacing[4],
  paddingTop: spacing[3],
}
const HEADER_TITLE: TextStyle = {
  fontSize: 18,
  fontWeight: "bold",
  textAlign: "center",
  margin:10
}
const IMAGE: ImageStyle = {
  margin:10,
  borderRadius:25,
  flexDirection:'row',
  justifyContent:'center',
  alignItems:'center',
  height: 100,
  width: 100,
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
const textPad : TextStyle ={
  padding:5
}
const columnLeft: TextStyle = {
  padding:15,
  justifyContent:'flex-start',
  textAlign:'left',
}
const buttonView : ViewStyle={
  padding: 15
}

export const CandidateDetailScreen: FC<StackScreenProps<NavigatorParamList, "candidateDetail">> = observer(function CandidateDetailScreen(props,navigation) {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  const {userStore,appStore} =useStores()
  const goBack = () => props.navigation.goBack()
  const item = props.route.params
  console.log('nexttt',item)
  const [load,isLoad]=useState(true)

  const [email,Setemail]=useState([])
  const [address,Setaddress]=useState([])
  const [experience,Setexperience]=useState([])

  useEffect(() => {
    userStore.getUser().then((item)=>{
      Setemail(item.emails)
      Setaddress(item.address)
      Setexperience(item.experiences)
      // getEmailById(item.id)
      // getAddressById(item.id)
      console.log('done load')
      isLoad(false)
    })
  }, [])
  console.log('email',email)
  const getEmailById=(id)=>{
    return email.filter((item)=> item.id == id )
  }
  const getAddressById=(id)=>{
    return address.filter((item)=> item.id == id )
  }
  const getExperienceById=(id)=>{
    return experience.filter((item)=> item.id == id )
  }
  return (
    <>
      {load ? (
        <LoadingScreen />
      ) : (
        <View style={FULL}>
          <Screen style={ROOT} preset="scroll">
            <Header leftIcon="back" onLeftPress={goBack} style={HEADER} headerText={"Candidate"} />
            <View style={headerWrap}>
              <Image source={{ uri: item.photo }} style={IMAGE} />
              <Text style={auth_title}>{item.name}</Text>
            </View>
            {email ? (
              <>
                <Text style={HEADER_TITLE}>User</Text>
                <View style={columnLeft}>
                  <Text style={textPad}>
                    {"Email : "}
                    {getEmailById(item.id)[0].email || ""}
                  </Text>
                  <Text style={textPad}>
                    {"Phone : "}
                    {getEmailById(item.id)[0]?.phone || ""}
                  </Text>
                  <Text style={textPad}>
                    {"Birthday : "}
                    {dayjs(item.Birthday).format('DD MMMM YYYY')}
                  </Text>
                  <Text style={textPad}>
                    {"Address : "}
                    {getAddressById(item.id)[0]?.address || ""},
                    {getAddressById(item.id)[0]?.city || ""},
                    {getAddressById(item.id)[0]?.state || ""},
                    {getAddressById(item.id)[0]?.zip_code || ""}
                  </Text>
                </View>
              </>
            ) : (
              <></>
            )}
            {experience ? (
              <>
                <Text style={HEADER_TITLE}>Experiences</Text>
                <View style={{ flex: 1 }}>
                  <View style={columnLeft}>
                    <Text style={textPad}>
                      {"Status : "}
                      {getExperienceById(item.id)[0].status}
                    </Text>
                    <Text style={textPad}>
                      {"Job Title : "}
                      {getExperienceById(item.id)[0].job_title}
                    </Text>
                    <Text style={textPad}>
                      {"Company Name : "}
                      {getExperienceById(item.id)[0].company_name}
                    </Text>
                    <Text style={textPad}>
                      {"Industry : "}
                      {getExperienceById(item.id)[0].industry}
                    </Text>
                  </View>
                </View>
              </>
            ) : (
              <></>
            )}
            <View style={buttonView}>
              <Button
              style={{backgroundColor:'red',margin:5}}
                onPress={() =>
                  Linking.openURL(
                    "mailto:support@example.com?subject=SendMail&body=Hi i am MK company",
                  )
                }
              >
                <Text>Send Email</Text>
              </Button>
              <Button
              style={{backgroundColor:'green',margin:5}}
                onPress={() =>
                  Linking.openURL(
                    'whatsapp://send?text=' +'Hi i am MK company'+ '&phone=' + '85296749466',
                  )
                }
              >
                <Text>Send Whatsapp</Text>
              </Button>
            </View>
          </Screen>
        </View>
      )}
    </>
  )
})
