import React from "react";
import { View } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { ScrollView } from "react-native-gesture-handler";
import MarkItem from "../../components/MarkItem";
import {  SIZES } from "../../assets/constants";
import { MarkStats } from "../../services/ScoreService";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const ScoreStatBar = ({
  stats,
}: {
  stats:
    | {
        [key: string]: MarkStats;
      }
    | undefined;
}) => {
  const theme = useContext(ThemeContext);

  if (stats) {
    return (
      <ScrollView
        style={{
          flex: 1,
          backgroundColor: theme!.grayPrimary,
        }}
      >
        <BarChart
          data={{
            labels: ["A", "B", "C", "D", "F"],
            datasets: [
              {
                data: Object.keys(stats).map((e) => stats[e].numberOfCredit),
              },
            ],
          }}
          width={SIZES.width - 20}
          height={200}
          chartConfig={{
            backgroundGradientFrom: theme!.primary,
            backgroundGradientTo: theme!.primary,
            color: (opacity = 1) => theme!.secondary,
            labelColor: (opacity = 1) => theme!.secondary,
            decimalPlaces: 0,
          }}
          showValuesOnTopOfBars={true}
          yAxisSuffix=""
          yAxisLabel=""
          style={{
            marginTop: 5,
            shadowColor: "#000",
            marginHorizontal: 10,
            borderRadius: 5,
          }}
        />

        <View
          style={{
            flex: 1,
          }}
        >
          {Object.keys(stats).map((e, i) => (
            <MarkItem
              key={i}
              type={e}
              title={stats[e].numberOfCredit}
              details={stats[e].details}
              percent={stats[e].percent}
            />
          ))}
          <View
            style={{
              marginTop: 5,
              height: 80,
              width: "100%",
              backgroundColor: theme!.grayPrimary,
            }}
          />
        </View>
      </ScrollView>
    );
  } else {
    return null;
  }
};

export default React.memo(ScoreStatBar);
