import React, { useEffect, useState } from "react";
import { View, Image, Text } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { RectButton } from "react-native-gesture-handler";

import landingImage from "../../assets/images/landing.png";
import studyIcon from "../../assets/images/icons/study.png";
import giveClassesIcon from "../../assets/images/icons/give-classes.png";
import HeartIcon from "../../assets/images/icons/heart.png";

import styles from "./styles";
import api from "../../services/api";

function Landing() {
  const { navigate } = useNavigation();
  const [totalConnection, setTotalConnection] = useState(0);

  useEffect(() => {
    api.get("connections").then((response) => {
      const { total } = response.data;
      setTotalConnection(total);
    });
  }, []);

  const handleNavigateToGiveClassesPage = () => {
    navigate("GiveClasses");
  };

  const handleNavigateToStudyPages = () => {
    navigate("Study");
  };

  return (
    <View style={styles.container}>
      <Image source={landingImage} style={styles.banner} />
      <Text style={styles.title}>
        Seja bem-vindo, {"\n"}
        <Text style={styles.titleBold}>O que deseja fazer?</Text>
      </Text>
      <View style={styles.buttonContainer}>
        <RectButton
          onPress={handleNavigateToStudyPages}
          style={[styles.button, styles.buttonPrimary]}
        >
          <Image source={studyIcon} />
          <Text style={styles.buttonText}>Estudar</Text>
        </RectButton>

        <RectButton
          onPress={handleNavigateToGiveClassesPage}
          style={[styles.button, styles.buttonSecondary]}
        >
          <Image source={giveClassesIcon} />
          <Text style={styles.buttonText}>Ensinar</Text>
        </RectButton>
      </View>

      <Text style={styles.totalConnection}>
        Total de {totalConnection} conexão realizados{" "}
        <Image source={HeartIcon} />
      </Text>

      <View style={styles.footer}>
        <Text style={[styles.message, styles.footerText]}>
          Criado com muito prazer na NLW#02
        </Text>
        <Text style={[styles.developer, styles.footerText]}>
          Paulo Spiguel & Rocketseat
        </Text>
        <Text style={[styles.versao, styles.footerText]}>Versão 1.0</Text>
      </View>
    </View>
  );
}

export default Landing;
