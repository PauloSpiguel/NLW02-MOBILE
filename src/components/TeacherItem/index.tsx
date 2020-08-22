import React, { useState } from "react";
import { View, Text, Image, Linking, Alert } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { RectButton } from "react-native-gesture-handler";

import whatsappIcon from "../../assets/images/icons/whatsapp.png";
import heartOutlineIcon from "../../assets/images/icons/heart-outline.png";
import unfavoite from "../../assets/images/icons/unfavorite.png";

import styles from "./styles";
import api from "../../services/api";

export interface Teacher {
  id: number;
  avatar: string;
  bio: string;
  cost: number;
  name: string;
  subject: string;
  whatsapp: string;
}

interface TeacherItemProps {
  teacher: Teacher;
  favorited: boolean;
}

const TeacherItem: React.FC<TeacherItemProps> = ({ teacher, favorited }) => {
  const [isFavorited, setIsFeatured] = useState(favorited);

  const handleLinkToWhatsapp = () => {
    api
      .post("connections", {
        user_id: teacher.id,
      })
      .then(() => {
        Linking.openURL(`whatsapp://send?phone=${teacher.whatsapp}`);
      })
      .catch((error) => {
        Alert.alert(
          "Oooops... 🤔",
          "Algo de errado aconteceu ao tentar conectar-se ao Proffy.\n \nPor favor, tente novamente!",
          [{ text: "OK", onPress: () => console.log("OK Pressed") }],
          { cancelable: false }
        );
      });
  };

  async function handleToggleFavoritedTeacher() {
    const favorites = await AsyncStorage.getItem("favorites");
    let favoritesArray = [];

    if (favorites) {
      favoritesArray = JSON.parse(favorites);
    }

    if (isFavorited) {
      const favoritedIndex = favoritesArray.findIndex(
        (teacherItem: Teacher) => {
          return teacherItem.id === teacher.id;
        }
      );

      favoritesArray.splice(favoritedIndex, 1);
      setIsFeatured(false);
    } else {
      favoritesArray.push(teacher);
      setIsFeatured(true);
    }
    await AsyncStorage.setItem("favorites", JSON.stringify(favoritesArray));
  }

  return (
    <View style={styles.container}>
      <View style={styles.profile}>
        <Image style={styles.avatar} source={{ uri: teacher.avatar }} />

        <View style={styles.profileInfo}>
          <Text style={styles.name}>{teacher.name}</Text>
          <Text style={styles.subject}>{teacher.subject}</Text>
        </View>
      </View>

      <Text style={styles.bio}>{teacher.bio}</Text>

      <View style={styles.footer}>
        <Text style={styles.price}>
          Preço/hora <Text style={styles.priceValue}> R${teacher.cost}</Text>
        </Text>

        <View style={styles.buttonsContainer}>
          <RectButton
            style={[styles.favoriteButton, isFavorited ? styles.favorited : {}]}
            onPress={handleToggleFavoritedTeacher}
          >
            {isFavorited ? (
              <Image source={unfavoite} />
            ) : (
              <Image source={heartOutlineIcon} />
            )}
          </RectButton>

          <RectButton
            style={styles.contactButton}
            onPress={handleLinkToWhatsapp}
          >
            <Image source={whatsappIcon} />
            <Text style={styles.contactButtonText}>Entre em contato</Text>
          </RectButton>
        </View>
      </View>
    </View>
  );
};

export default TeacherItem;
