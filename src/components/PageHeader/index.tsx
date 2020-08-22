import React from "react";
import { View, Image, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import GoToBackImage from "../../assets/images/icons/back.png";
import ImageLogo from "../../assets/images/logo.png";

import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

interface HeaderProps {
  title: string;
}
const PageHeader: React.FC<HeaderProps> = ({ title }) => {
  const { navigate } = useNavigation();

  const handleGoToBack = () => {
    navigate("Landing");
  };

  return (
    <View style={styles.container}>
      <View style={styles.topBar}>
        <BorderlessButton onPress={handleGoToBack}>
          <Image source={GoToBackImage} resizeMode="contain"></Image>
        </BorderlessButton>

        <Image source={ImageLogo} resizeMode="contain" />
      </View>

      <Text style={styles.title}>{title}</Text>
    </View>
  );
};

export default PageHeader;
