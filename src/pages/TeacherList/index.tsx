import React, { useState, useEffect } from "react";
import { View, ScrollView, Text, TextInput } from "react-native";
import AsyncStorage from "@react-native-community/async-storage";
import { Feather } from "@expo/vector-icons";

import PageHeader from "../../components/PageHeader";

import TeacherItem, { Teacher } from "../../components/TeacherItem";
import { BorderlessButton, RectButton } from "react-native-gesture-handler";

import styles from "./styles";
import api from "../../services/api";

function TeacherList() {
  const [teachers, setTeachers] = useState([]);
  const [favorites, setFavorites] = useState<number[]>([]);
  const [isFilterVisible, setIsFilterVisible] = useState(false);
  const [subject, setSubject] = useState("");
  const [week_day, setWeekDay] = useState("");
  const [time, setTime] = useState("");

  const handleToggleFilter = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  function loadFavorites() {
    AsyncStorage.getItem("favorites").then((response) => {
      if (response) {
        const favoritedTeachers = JSON.parse(response);
        const favoritedTeachersIds = favoritedTeachers.map(
          (teacher: Teacher) => {
            return teacher.id;
          }
        );
        setFavorites(favoritedTeachersIds);
      }
    });
  }

  async function handleFilterSubmit() {
    loadFavorites();
    const response = await api.get("classes", {
      params: {
        subject,
        week_day,
        time,
      },
    });

    setTeachers(response.data);
    setIsFilterVisible(false);
  }

  return (
    <View style={styles.container}>
      <PageHeader
        title="Proffys disponíveis"
        headerRight={
          <BorderlessButton>
            <Feather
              name="filter"
              style={styles.filterIcon}
              onPress={handleToggleFilter}
            />
          </BorderlessButton>
        }
      >
        {isFilterVisible && (
          <View style={styles.searchForm}>
            <Text style={styles.label}>Matéria</Text>
            <TextInput
              placeholderTextColor="#c1dccc"
              style={styles.input}
              placeholder="Qual a matéria?"
              onChangeText={(text) => setSubject(text)}
            />
            <View style={styles.inputGroup}>
              <View style={styles.inputBlock}>
                <Text style={styles.label}>Dia da semana</Text>
                <TextInput
                  placeholderTextColor="#c1dccc"
                  style={styles.input}
                  placeholder="Qual o dia?"
                  onChangeText={(text) => setWeekDay(text)}
                />
              </View>

              <View style={styles.inputBlock}>
                <Text style={styles.label}>Horário</Text>
                <TextInput
                  placeholderTextColor="#c1dccc"
                  style={styles.input}
                  placeholder="Qual horário?"
                  onChangeText={(text) => setTime(text)}
                />
              </View>
            </View>
            <RectButton
              style={styles.submitButton}
              onPress={handleFilterSubmit}
            >
              <Text style={styles.submitButtonText}>Filtrar</Text>
            </RectButton>
          </View>
        )}
      </PageHeader>
      <ScrollView
        style={styles.teacherList}
        contentContainerStyle={{
          paddingHorizontal: 16,
          paddingBottom: 16,
        }}
      >
        {teachers.length ? (
          teachers.map((teacher: Teacher) => (
            <TeacherItem
              key={teacher.id}
              teacher={teacher}
              favorited={favorites.includes(teacher.id)}
            />
          ))
        ) : (
          <View style={styles.notFoundTeacher}>
            <Text style={styles.notFoundTeacherText}>
              Nenhum Proffy encontrado.
            </Text>
            <Text style={styles.notFoundTeacherText}>
              Tente realizar uma nova pesquisa.
            </Text>

            <Feather
              name="filter"
              style={{
                fontSize: 30,
                color: "#6a6180",
                marginTop: 12,
              }}
              onPress={handleToggleFilter}
            />
          </View>
        )}
      </ScrollView>
    </View>
  );
}

export default TeacherList;
