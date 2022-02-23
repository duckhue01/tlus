import React from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { View, Text } from "react-native";
import { ProgressChart } from "react-native-chart-kit";
import { DataTable } from "react-native-paper";
import { COLORS, FONTS } from "../../assets/constants";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";

const TuiTionChart = ({ tuition }: { tuition: TuitionModel | undefined }) => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: theme!.primary,
        borderRadius: 5,
        margin:10
      }}
    >
      <ProgressChart
        data={{
          data: [
            tuition
              ? Math.min(tuition.totalReceived / tuition.totalReceiveAble, 1)
              : 0,
          ],
        }}
        width={100}
        height={100}
        strokeWidth={16}
        radius={32}
        chartConfig={{
          backgroundGradientFrom: theme!.primary,
          backgroundGradientTo: theme!.primary,
          color: (o = 1) => {
            switch (o) {
              case 1:
                return COLORS.green;
              case 0.5:
                return COLORS.green;
              case 0.2:
                return COLORS.red;
              default:
                return COLORS.green;
            }
          },
          strokeWidth: 2, // optional, default 3
          barPercentage: 0.5,
          useShadowColorFromDataset: false, // optional
        }}
        hideLegend={true}
      />
      <DataTable
        style={{
          width: "70%",
        }}
      >
        <DataTable.Row>
          <DataTable.Cell
            style={{
              flex: 1,
              justifyContent: "flex-end",
            }}
          >
            <Text
              style={{
                color: theme!.secondary,
                ...FONTS.h3,
              }}
            >
              Tổng thu :
            </Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{ flex: 2 }}>
            {tuition ? (
              <Text
                style={{
                  color: theme!.secondary,
                  ...FONTS.body4,
                }}
              >
                {tuition.totalReceiveAble
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₫"}
              </Text>
            ) : (
              <ContentLoader
                width="100"
                height="5"
                foregroundColor={theme!.graySecondary}
                backgroundColor={theme!.grayPrimary}
              >
                <Rect x="0" y="0" width="100%" height="5" rx="5" />
              </ContentLoader>
            )}
          </DataTable.Cell>
        </DataTable.Row>

        <DataTable.Row>
          <DataTable.Cell style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text
              style={{
                color: COLORS.green,
                ...FONTS.h4,
              }}
            >
              Đã nộp :
            </Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{ flex: 2 }}>
            {tuition ? (
              <Text
                style={{
                  ...FONTS.body4,
                  color: theme!.secondary,
                }}
              >
                {tuition.totalReceived
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₫"}
              </Text>
            ) : (
              <ContentLoader
                width="100"
                height="5"
                foregroundColor={theme!.graySecondary}
                backgroundColor={theme!.grayPrimary}
              >
                <Rect x="0" y="0" width="100%" height="5" rx="5" />
              </ContentLoader>
            )}
          </DataTable.Cell>
        </DataTable.Row>
        <DataTable.Row>
          <DataTable.Cell style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text
              style={{
                color: COLORS.red,
                ...FONTS.h4,
              }}
            >
              Còn lại :
            </Text>
          </DataTable.Cell>
          <DataTable.Cell numeric style={{ flex: 2 }}>
            {tuition ? (
              <Text
                style={{
                  color: theme!.secondary,
                  ...FONTS.body4,
                }}
              >
                {tuition.totalReceiveAbleNotComplete
                  .toString()
                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",") + "₫"}
              </Text>
            ) : (
              <ContentLoader
                width="100"
                height="5"
                foregroundColor={theme!.graySecondary}
                backgroundColor={theme!.grayPrimary}
              >
                <Rect x="0" y="0" width="100%" height="5" rx="5" />
              </ContentLoader>
            )}
          </DataTable.Cell>
        </DataTable.Row>
      </DataTable>
    </View>
  );
};
export default TuiTionChart;
