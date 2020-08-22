import React, { ReactNode } from "react";
import { View, Image, Text } from "react-native";
import { BorderlessButton } from "react-native-gesture-handler";

import GoToBackImage from "../../assets/images/icons/back.png";
import ImageLogo from "../../assets/images/logo.png";

import { useNavigation } from "@react-navigation/native";

import styles from "./styles";

interface HeaderProps {
  title: string;
  headerRight?: ReactNode;
}
const PageHeader: React.FC<HeaderProps> = ({
  title,
  headerRight,
  children,
}) => {
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

      <View style={styles.header}>
        <Text style={styles.title}>{title}</Text>
        {headerRight}
      </View>
      {children}
    </View>
  );
};

export default PageHeader;
