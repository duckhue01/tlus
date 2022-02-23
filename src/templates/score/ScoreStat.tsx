import React, { useContext, useEffect, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import { Title } from "react-native-paper";
import { SIZES, FONTS } from "../../assets/constants";
import ScoreStatBar from "./ScoreStatBar";
import ScoreStatLine from "./ScoreStatLine";
import { AntDesign } from "@expo/vector-icons";
import ScoreService, { MarkStats } from "../../services/ScoreService";
import ContentLoader, { Rect } from "react-content-loader/native";
import ServerErrorTemplate from "../ServerErrorTemplate";
import { ErrorBoundaryTemplate } from "../ErrorBoundaryTemplate";
import { AdMobBanner } from "expo-ads-admob";
import { ThemeContext } from "../../context/ThemeContext";


const ScoreStat = () => {
  const [viewMode, setViewMode] = React.useState<"line" | "bar">("line");
  const [barStats, setBarStats] = useState<
    | {
      [key: string]: MarkStats;
    }
    | undefined
    | null
  >(undefined);

  const [lineStats, setLineStats] = useState<
    | {
      [key: string]: {
        sumOfCredit: number;
        finalXCredit: number;
        detail: [
          {
            subject: string;
            credit: number;
          }
        ];
      };
    }
    | undefined
    | null
  >(undefined);
  const [average, setAverage] = useState<number | undefined | null>(undefined);
  const [counter, setCounter] = useState<number>(0);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    (async () => {
      const temp = await ScoreService.getAverageAndNumberOfCredit();
      const [average, numberOfCredit] = temp !== null ? temp : [null, null];
      setAverage(average);
      setBarStats(await ScoreService.getStatsByMark());
      setLineStats(await ScoreService.getStatsBySemester());
    })();
  }, [counter]);

  if (average === null || barStats === null || lineStats === null) {
    return (
      <ServerErrorTemplate
        reconnect={() => {
          setCounter(counter + 1);
        }}
        message="Gặp sự cố khi kết nối đến máy chủ!!!"
      />
    );
  } else {
    return (
      <ErrorBoundaryTemplate>
        <View
          style={{
            flex: 1,
            backgroundColor: theme!.grayPrimary,
          }}
        >
          <Header
            viewMode={viewMode}
            setViewMode={setViewMode}
            average={average}
          />
          {viewMode === "line" && <ScoreStatLine stats={lineStats} />}
          {viewMode === "bar" && <ScoreStatBar stats={barStats} />}
        </View>
        <AdMobBanner
          bannerSize="banner"
          adUnitID="ca-app-pub-3940256099942544/6300978111"
          servePersonalizedAds // true or false
          onDidFailToReceiveAdWithError={() => { }}
          style={{
            alignSelf: "center",
            position: "absolute",
            bottom: 10,
          }}
        />
      </ErrorBoundaryTemplate>
    );
  }



};

const Header = ({
  viewMode,
  setViewMode,
  average,
}: {
  viewMode: any;
  setViewMode: any;
  average: number | undefined | null;
}) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        borderBottomLeftRadius: 5,
        borderBottomRightRadius: 5,
        backgroundColor: theme!.primary,
        paddingHorizontal: 20,
        paddingVertical: 10,
      }}
    >
      <View>
        <Text
          style={{
            ...FONTS.body4,
            color: theme!.graySecondary,
          }}
        >
          Điểm trung bình tích lũy:
        </Text>
        <View>
          {average ? (
            <Title
              style={{
                ...FONTS.h2,
                color: theme!.secondary,
              }}
            >
              {`${average.toFixed(2)} | ${(average / 2.5).toFixed(2)}`}
            </Title>
          ) : (
            <ScoreLoader />
          )}
        </View>
      </View>
      <View
        style={{
          flexDirection: "row",
        }}
      >
        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              viewMode == "line" ? theme!.secondary : theme!.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
          }}
          onPress={() => setViewMode("line")}
        >
          <AntDesign
            name="linechart"
            size={20}
            color={viewMode == "line" ? theme!.primary : theme!.secondary}
          />
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            backgroundColor:
              viewMode == "bar" ? theme!.secondary : theme!.primary,
            height: 50,
            width: 50,
            borderRadius: 25,
            marginLeft: SIZES.base,
          }}
          onPress={() => setViewMode("bar")}
        >
          <AntDesign
            name="barschart"
            size={24}
            color={viewMode == "bar" ? theme!.primary : theme!.secondary}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const ScoreLoader = () => {
  const theme = useContext(ThemeContext);
  return (
    <ContentLoader
      width={80}
      height={15}
      foregroundColor={theme!.graySecondary}
      backgroundColor={theme!.grayPrimary}
    >
      <Rect x="0" y="0" width="100%" height="100%" rx="3" />
    </ContentLoader>
  );
};

export default ScoreStat;
