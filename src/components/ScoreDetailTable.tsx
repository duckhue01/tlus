import React, { useContext } from "react";
import { DataTable } from "react-native-paper";
import { COLORS, SIZES, FONTS } from "../assets/constants";
import { Text, View } from "react-native";
import ContentLoader, { Rect } from "react-content-loader/native";
import { ThemeContext } from "../context/ThemeContext";
const DetailTable = ({ details }: { details: any[] | undefined }) => {
  const theme = useContext(ThemeContext);
  if (details) {
    
    return (
      <DataTable
        style={{
          backgroundColor: theme!.primary,
          marginTop: 5,
          marginHorizontal: 10,
          borderRadius: 5,
          width: SIZES.width - 20,
        }}
      >
        <DataTable.Header>
          <DataTable.Title style={{ flex: 6 }}>
            <Text style={{ ...FONTS.h4, color: theme!.secondary }}>
              Môn học
            </Text>
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={{ ...FONTS.h4, color: theme!.secondary }}>
              Tín chỉ
            </Text>
          </DataTable.Title>
          <DataTable.Title style={{ flex: 1, justifyContent: "flex-end" }}>
            <Text style={{ ...FONTS.h4, color: theme!.secondary }}>Điểm</Text>
          </DataTable.Title>
        </DataTable.Header>
        {details.map((e: any, i: any) => {
          return (
            <View key={i}>
              <DataTable.Row>
                <DataTable.Cell style={{ flex: 6 }}>
                  <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
                    {e.subject}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell
                  numeric
                  style={{ flex: 1, justifyContent: "flex-end" }}
                >
                  <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
                    {e.credit}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell
                  numeric
                  style={{ flex: 1, justifyContent: "flex-end" }}
                >
                  <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
                    {e.final}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            </View>
          );
        })}
      </DataTable>
    );
  } else
    return (
      <ContentLoader
        width="80%"
        height={40}
        foregroundColor={theme!.graySecondary}
        backgroundColor={theme!.grayPrimary}
        style={{
          marginHorizontal: 20,
        }}
      >
        <Rect x="0" y="0" width="80%" height="10" rx="3" />
        <Rect x="0" y="20" width="100%" height="10" rx="3" />
      </ContentLoader>
    );
};

export default DetailTable;
