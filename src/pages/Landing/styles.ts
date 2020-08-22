import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#8257e5",
    flex: 1,
    justifyContent: "center",
    paddingTop: 40,
    paddingBottom: 10,
    paddingHorizontal: 40,
  },
  banner: {
    width: "100%",
    resizeMode: "contain",
  },
  title: {
    fontFamily: "Poppins_400Regular",
    color: "#fff",
    fontSize: 20,
    lineHeight: 30,
    marginTop: 80,
  },
  titleBold: {
    fontFamily: "Poppins_600SemiBold",
  },
  buttonContainer: {
    flexDirection: "row",
    marginTop: 40,
    justifyContent: "space-between",
  },
  button: {
    backgroundColor: "#333",
    height: 150,
    width: "48%",
    borderRadius: 8,
    padding: 24,
    justifyContent: "space-between",
    alignItems: "center",
  },
  buttonPrimary: {
    backgroundColor: "#9871f5",
  },
  buttonSecondary: {
    backgroundColor: "#04d361",
  },
  buttonText: {
    fontFamily: "Archivo_700Bold",
    color: "#fff",
    fontSize: 20,
  },
  totalConnection: {
    fontFamily: "Poppins_400Regular",
    color: "#d4c2ff",
    fontSize: 12,
    lineHeight: 20,
    marginTop: 40,
    textAlign: "center",
  },
  footer: {
    flex: 1,
    justifyContent: "flex-end",
    alignItems: "center",
    marginTop: 0,
  },
  footerText: {
    fontSize: 12,
    color: "#d4c2ff",
    fontFamily: "Poppins_400Regular",
    lineHeight: 16,
    opacity: 0.6,
  },
});

export default styles;
