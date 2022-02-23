import React from "react";
import { DataTable } from "react-native-paper";
import { FONTS, COLORS, SIZES } from "../../assets/constants";
import { Text } from "react-native";

import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
const FeeDetailTable = ({ details }: { details: any[] | undefined }) => {
  const theme = useContext(ThemeContext);
  if (details) {
    return (
      <DataTable
        style={{
          borderColor: theme!.grayPrimary,
          borderRadius: 5,
          borderWidth: 1,
          marginVertical: 5,
          marginHorizontal: 10,
          width: SIZES.width - 20,
          backgroundColor: theme!.primary,
        }}
      >
        <DataTable.Header>
          <DataTable.Title
            style={{
              flex: 3,
            }}
          >
            <Text
              style={{
                ...FONTS.h4,
                color: theme!.secondary,
              }}
            >
              Khoản phí
            </Text>
          </DataTable.Title>
          <DataTable.Title
            numeric
            style={{
              flex: 1,
            }}
          >
            <Text
              style={{
                ...FONTS.h4,
                color: theme!.secondary,
              }}
            >
              Học phí
            </Text>
          </DataTable.Title>
        </DataTable.Header>
        {details.map((e: any) => {
          return (
            <DataTable.Row key={e.name}>
              <DataTable.Cell
                style={{
                  flex: 3,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body4,
                    color: theme!.secondary,
                  }}
                >
                  {e.name
                    .toString()
                    .replace("Học phí môn ", "")
                    .replace(/-.{1,}$/, "")}
                </Text>
              </DataTable.Cell>
              <DataTable.Cell
                numeric
                style={{
                  flex: 1,
                  ...FONTS.h4,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body4,
                    color: theme!.secondary,
                  }}
                >
                  {e.total.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",") +
                    "₫"}
                </Text>
              </DataTable.Cell>
            </DataTable.Row>
          );
        })}
      </DataTable>
    );
  }
  return null;
};
export default FeeDetailTable;
