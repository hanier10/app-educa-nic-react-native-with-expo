import { View, Text, Image } from "react-native";
import { styles } from "@/components/BannerStyle";
import Swiper from "react-native-swiper";
import { bannerData } from "@/constants/constans";

export default function HomeBannerSlider() {
  return (
    <View style={styles.container}>
      <Swiper
        dotStyle={styles.dot}
        activeDotStyle={styles.activeDot}
        autoplay={true}
        autoplayTimeout={5}
      >
        {bannerData.map((item: BannerDataTypes, index: number) => (
          <View key={index} style={styles.slide}>
            <Image
              source={item.bannerImageUrl!}
              style={{ width: 400, height: 250 }}
            />
          </View>
        ))}
      </Swiper>
    </View>
  );
}
