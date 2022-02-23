import React, { useContext } from "react";
import { View, Text } from "react-native";
import { List } from "react-native-paper";
import { COLORS, FONTS } from "../assets/constants";
import { AntDesign } from "@expo/vector-icons";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import ContentLoader, { Rect } from "react-content-loader/native";
import DetailTable from "./ScoreDetailTable";
import { ThemeContext } from "../context/ThemeContext";

type SemesterItemProps = {
  semester: string | undefined;
  credit: number | undefined;
  stats: number | undefined;
  details: any[] | undefined;
  average: number | undefined;
};

const SemesterItem = ({
  semester,
  credit,
  stats,
  details,
  average,
}: SemesterItemProps) => {
  const theme = useContext(ThemeContext);
  return (
    <List.Accordion
      style={{
        backgroundColor: theme!.primary,
        marginTop: 5,
        marginHorizontal: 10,
        borderRadius: 5,
      }}
      theme={{
        colors: { background: theme!.grayPrimary, primary:theme!.secondary },
      }}
      titleStyle={{
        width: "100%",
      }}
      descriptionStyle={{
        width: "100%",
      }}
      title={<SumTitle average={average} />}
      description={<StatsDetail stats={stats} credit={credit} />}
      left={() => (
        <View
          style={{
            width: 50,
            height: 50,
            justifyContent: "center",
            alignItems: "center",
            borderRadius: 50,
            shadowColor: "#000",
            shadowOffset: {
              width: 2,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 3,
            backgroundColor: theme!.primary,
            marginHorizontal: 20,
          }}
        >
          <Semester semester={semester} />
        </View>
      )}
    >
      <DetailTable details={details} />
    </List.Accordion>
  );
};

const SumTitle = ({ average }: { average: number | undefined }) => {
  const theme = useContext(ThemeContext);
  if (average !== undefined) {
    return (
      <Text
        style={{
          ...FONTS.h4,
          color: theme!.graySecondary,
        }}
      >
        {`Điểm trung bình kì này: ${average.toFixed(2)}`}
      </Text>
    );
  } else
    return (
      <ContentLoader
        width={150}
        height={20}
        foregroundColor={theme!.graySecondary}
        backgroundColor={theme!.grayPrimary}
      >
        <Rect x="0" y="10" width="100%" height="10" rx="3" />
      </ContentLoader>
    );
};

const StatsDetail = ({
  stats,
  credit,
}: {
  stats: number | undefined;
  credit: number | undefined;
}) => {
  const theme = useContext(ThemeContext);
  if (stats !== undefined && credit !== undefined) {
    return (
      <View>
        <Text
          style={{
            ...FONTS.body4,
            color: theme!.graySecondary,
          }}
        >
          {`Tổng số  tín chỉ: ${credit}`}
        </Text>

        {stats > 0 ? (
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.green,
            }}
          >
            <AntDesign name="caretup" size={12} color={COLORS.green} />
            {"  "}Tăng {stats.toFixed(2)} so với kì trước
          </Text>
        ) : stats < 0 ? (
          <Text
            style={{
              ...FONTS.body4,
              color: COLORS.red,
            }}
          >
            <AntDesign name="caretdown" size={12} color={COLORS.red} />
            {"  "}Giảm {Math.abs(stats).toFixed(2)} so với kì trước
          </Text>
        ) : (
          <Text
            style={{
              ...FONTS.body4,
              color: theme!.graySecondary,
            }}
          >
            <MaterialCommunityIcons
              name="rectangle"
              size={12}
              color={theme!.graySecondary}
            />
            {"  "}Kì này không có thay đổi
          </Text>
        )}
      </View>
    );
  } else {
    return (
      <ContentLoader
        width={120}
        height={24}
        foregroundColor={theme!.graySecondary}
        backgroundColor={theme!.grayPrimary}
      >
        <Rect x="0" y="6" width="100%" height="6" rx="3" />
        <Rect x="0" y="18" width="100%" height="6" rx="3" />
      </ContentLoader>
    );
  }
};

const Semester = ({ semester }: { semester: string | undefined }) => {
  const theme = useContext(ThemeContext);
  if (semester) {
    return (
      <Text
        style={{
          ...FONTS.h3,
          color: theme!.secondary,
        }}
      >
        {semester}
      </Text>
    );
  } else {
    return (
      <ContentLoader
        width={30}
        height={15}
        foregroundColor={theme!.graySecondary}
        backgroundColor={theme!.grayPrimary}
      >
        <Rect x="0" y="0" width="100%" height="100%" rx="3" />
      </ContentLoader>
    );
  }
};

export default SemesterItem;
