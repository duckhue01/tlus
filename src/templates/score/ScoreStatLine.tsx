import React from "react";
import { View } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import SemesterItem from "../../components/SemesterItem";

import { COLORS, FONTS, SIZES } from "../../assets/constants";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

type ScoreStatLineProps = {
  stats:
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
  | undefined;
};

const ScoreStatLine = ({ stats }: ScoreStatLineProps) => {
  const theme = useContext(ThemeContext);
  return (
    <ScrollView
      style={{
        flex: 1,
        backgroundColor: theme!.grayPrimary,
      }}
    >
      <ScoreStatsLineChart stats={stats} />
      <ScoreStatsDetail stats={stats} />
    </ScrollView>
  );
};

const ScoreStatsLineChart = ({ stats }: ScoreStatLineProps) => {
  let _stats: any;
  const theme = useContext(ThemeContext);
  if (stats && Object.keys(stats).length !== 0) {
    _stats = stats;
  } else {
    let placeHolder = {};

    Array.from(new Array(5), (_, i) => i).forEach((e) => {
      placeHolder = {
        ...placeHolder,
        [e]: {
          sumOfCredit: 0,
          finalXCredit: 0,
        },
      };
    });
    _stats = placeHolder;
  }

  const keys = Object.keys(_stats);

  return (
    <LineChart
      data={{
        labels: keys,
        datasets: [
          {
            data: keys.map((e: string) => {
              if (_stats[e].sumOfCredit > 0) {
                return _stats[e].finalXCredit / _stats[e].sumOfCredit / 2.5;
              } else {
                return 0;
              }
            }),
            color: (opacity = 1) => theme!.graySecondary,
          },
        ],
      }}
      width={SIZES.width - 20}
      height={200}
      chartConfig={{
        backgroundGradientFrom: theme!.primary,
        backgroundGradientTo: theme!.primary,
        color: (opacity = 1) => theme!.secondary,
        strokeWidth: 2, // optional, default 3
        propsForDots: {
          strokeWidth: "4",
          stroke: COLORS.black,
        },
        labelColor: (opacity = 1) => theme!.secondary,
      }}
      fromZero={false}
      style={{
        marginTop: 5,
        shadowColor: "#000",
        marginHorizontal: 10,
        borderRadius: 5,
      }}
    />
  );
};

const ScoreStatsDetail = ({ stats }: ScoreStatLineProps) => {
  if (stats) {
    const keysReverse = Object.keys(stats).reverse();
    const theme = useContext(ThemeContext);
    const content = keysReverse.map((e, i) => {
      let statsTemp;
      const average = stats[e].finalXCredit / stats[e].sumOfCredit / 2.5;

      if (i < keysReverse.length - 1) {
        statsTemp =
          (stats[e].finalXCredit / stats[e].sumOfCredit -
            stats[keysReverse[i + 1]].finalXCredit /
            Math.max(stats[keysReverse[i + 1]].sumOfCredit, 1)) /
          2.5;
      } else {
        statsTemp =
          stats[keysReverse[keysReverse.length - 1]].finalXCredit /
          Math.max(stats[keysReverse[keysReverse.length - 1]].sumOfCredit, 1) /
          2.5;
      }

      return (
        <SemesterItem
          key={i}
          semester={e}
          credit={stats[e].sumOfCredit}
          stats={statsTemp}
          details={stats[e].detail}
          average={average}
        />
      );
    });
    return (
      <View style={{ backgroundColor: theme!.grayPrimary, flex: 1 }}>
        {content}
        <View
          style={{
            marginTop: 5,
            height: 80,
            width: "100%",
            backgroundColor: theme!.grayPrimary,
          }}
        />
      </View>
    );
  } else {
    const content = Array.from(new Array(5), (_, i) => i).map((e, i) => (
      <SemesterItem
        key={i}
        semester={undefined}
        credit={undefined}
        stats={undefined}
        details={undefined}
        average={undefined}
      />
    ));

    return <>{content}</>;
  }
};

export default React.memo(ScoreStatLine);
