import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle,View,ActivityIndicator,Modal } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { NavigatorParamList } from "../../navigators"
import { Screen, Text,GradientBackground } from "../../components"
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../../models"
import { color } from "../../theme"
import { useStores } from "../../models"

const ROOT: ViewStyle = {
}
const ModalBG : ViewStyle = {
  flex: 1,
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'space-around',
    backgroundColor: '#00000040'
}
const activityIndicatorWrapper : ViewStyle={
  backgroundColor: '#FFFFFF',
  height: 100,
  width: 100,
  borderRadius: 10,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'space-around'
}

export const LoadingScreen: FC<StackScreenProps<NavigatorParamList, "loading">> = observer(function LoadingScreen() {
  // Pull in one of our MST stores
  const { appStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={ROOT} preset="scroll">
        
     <Modal
      transparent={true}
      animationType={'none'}
      visible={appStore.isLoading}
      onRequestClose={() => {console.log('close modal')}}>
      <View style={ModalBG}>
        <GradientBackground colors={["#422443", "#281b34"]} />
        <View style={activityIndicatorWrapper}>
          <ActivityIndicator
            animating={appStore.isLoading} 
            size={20}/>
        </View>
      </View>
    </Modal>
    </Screen>
  )
})
