import React from "react";
import {
  View,
  Text,
  Image,
  FlatList,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Pressable,
} from "react-native";
import { Eye } from "lucide-react-native";
import ScreenWrapper from "@/components/ScreenWrapper";
import { StatusBar } from "expo-status-bar";
import Icon from "@/assets/icons";
import { hp, wp } from "@/helpers/common";
import { theme } from "@/constants/theme";
import Avatar from "@/components/Avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "expo-router";

const students = [
  {
    id: "1",
    name: "Gilmer José Jirón Gaitán",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },
  {
    id: "2",
    name: "Solimar Estrella Luna Zavala",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },
  {
    id: "3",
    name: "Gersan Jalissat Martínez Bravo",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },
  {
    id: "4",
    name: "Shellsy García Chamorro",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },
  {
    id: "5",
    name: "Stephany Soleidy Reyes Moraga",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },
  {
    id: "6",
    name: "William Daniel Martínez Prado",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "7",
    name: "Emely Esther  Martínez Guevara",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "8",
    name: "Emeral Jamil  González Emaldi ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "9",
    name: "Emily Fabiola  Acevedo Gática",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "10",
    name: "Francis Marina  Rodríguez Monge",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "11",
    name: "Frania Dayanara  Artola Bermúdez ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "12",
    name: "Leyssi Daviana  Rivas Obregón  ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "13",
    name: "Lilianna Darieska Aragón Coronado ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "14",
    name: "Lohendys Catalina  Arróliga Hernández  ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "15",
    name: "Luci Mileyding   García Morales  ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "16",
    name: "María Fernanda  González Fernández  ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "17",
    name: "Madison Adilia   Báez Laguna ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "18",
    name: "Siadeck Camila  Izaguirrez Pineda",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "19",
    name: "Sofía Valentina Rodríguez Calero ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },

  {
    id: "20",
    name: "Stephany Soleidy  Reyes Moraga ",
    imageUrl:
      "https://westus31-mediap.svc.ms/transform/thumbnail?provider=spo&farmid=193376&inputFormat=jpg&cs=MDAwMDAwMDAtMDAwMC0wMDAwLTAwMDAtMDAwMDQ4MTcxMGE0fFNQTw&docid=https%3A%2F%2Fmy.microsoftpersonalcontent.com%2F_api%2Fv2.0%2Fdrives%2Fb!kA0SSpupX0CCbpmuRSQdMhX-v-56gKZPtyHlXUhFRWbQnQ1_LP7SSI6vxWWGGLJf%2Fitems%2F015LOKC5NMWSM4LXGOO5EJMKTF2DK52KI3%3Ftempauth%3Dv1e.eyJzaXRlaWQiOiI0YTEyMGQ5MC1hOTliLTQwNWYtODI2ZS05OWFlNDUyNDFkMzIiLCJhcHBpZCI6IjAwMDAwMDAwLTAwMDAtMDAwMC0wMDAwLTAwMDA0ODE3MTBhNCIsImF1ZCI6IjAwMDAwMDAzLTAwMDAtMGZmMS1jZTAwLTAwMDAwMDAwMDAwMC9teS5taWNyb3NvZnRwZXJzb25hbGNvbnRlbnQuY29tQDkxODgwNDBkLTZjNjctNGM1Yi1iMTEyLTM2YTMwNGI2NmRhZCIsImV4cCI6IjE3Mjg2ODA0MDAifQ.n8CPyQHZyUqoaXo3OHBpCSHmPrrNg63wjAzgg-tnqjEW-kHcHT06eciccjVp-kGZmUBqqdzP90CFAw3oZedUJoYE6U97ldFQvMGriCGqHUZw_b2ZGg4WEowqJT7gpiesq1UqhCPYQGQ0GAuBtWzLt2Fzd-tzWF6v7c63-SE7FF--o0k2u_aHisObAAESbOEkj3L_kBgUFIUJMUPfdqhfVRO18SqWLmF9bXkx8WuL3RW8vWBtFg1AGQmGp9zxr2hH0YwwdzmELK9ooBkDv2pPiEkQVPCqL_L2-x07WUH-59SchBF4MOUzfqwYfPvNmz2jnf7CsfI3mDOwJzzj1SJVvPBVhwTu3_2olXzzXYLXcKg.d4gvfWrPjqmBJsdqASRn2DX0t8zO3KlURgnQx4sUqw8%26version%3DPublished&cb=63864261474&encodeFailures=1&width=183&height=211",
  },
];

export default function GradeRecorder() {
  const { user } = useAuth();
  const router = useRouter();

  const StudentItem = ({ name, imageUrl }) => (
    <View style={styles.studentItem}>
      <Image source={{ uri: imageUrl }} style={styles.avatar} />
      <Text style={styles.name}>{name}</Text>
      <TouchableOpacity style={styles.eyeButton}>
        <Pressable
          style={styles.eyeCircle}
          onPress={() => router.push("/ingresarCalificacion")}
        >
          <Eye size={20} color="#000" />
        </Pressable>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScreenWrapper bg="white">
      <StatusBar style="dark" />

      <View style={styles.headerBar}>
        <Text style={styles.titleBar}>EducaNic</Text>
        <View style={styles.icons}>
          <Pressable onPress={() => router.push("/notifications")}>
            <Icon
              name="heart"
              size={hp(3)}
              strokeWidth={2}
              color={theme.colors.text}
            />
          </Pressable>
          <Pressable onPress={() => router.push("/newPost")}>
            <Icon
              name="plus"
              size={hp(3)}
              strokeWidth={2}
              color={theme.colors.text}
            />
          </Pressable>
          <Pressable onPress={() => router.push("/profile")}>
            <Avatar
              uri={user?.image}
              size={hp(4.3)}
              rounded={theme.radius.sm}
              style={{ borderWidth: 2 }}
            />
          </Pressable>
        </View>
      </View>

      <View style={styles.header}>
        <Text style={styles.title}>Registro Calificaciones</Text>
      </View>
      <FlatList
        data={students}
        renderItem={({ item }) => (
          <StudentItem name={item.name} imageUrl={item.imageUrl} />
        )}
        keyExtractor={(item) => item.id}
      />
    </ScreenWrapper>
  );
}

const styles = StyleSheet.create({
  headerBar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 10,
    marginHorizontal: wp(4),
  },
  titleBar: {
    color: theme.colors.text,
    fontSize: hp(3.2),
    fontWeight: "bold",
  },
  icons: {
    flexDirection: "row",
    alignItems: "center",
    gap: 18,
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  header: {
    alignItems: "center",
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  title: {
    fontSize: 22,
    fontWeight: "bold",
    color: "#333",
  },
  subject: {
    fontSize: 18,
    color: "#e91e63",
    marginTop: 5,
  },
  grade: {
    fontSize: 16,
    color: "#666",
    marginTop: 5,
  },
  studentItem: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 15,
  },
  name: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  eyeButton: {
    padding: 5,
  },
  eyeCircle: {
    backgroundColor: "#ffeb3b",
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: "center",
    alignItems: "center",
  },
});
