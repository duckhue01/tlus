import BottomSheet, { BottomSheetBackdrop } from "@gorhom/bottom-sheet";
import { AdMobBanner } from "expo-ads-admob";
import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import ContentLoader, { Rect } from "react-content-loader/native";
import { StyleSheet, ScrollView, View, Text } from "react-native";
import { ActivityIndicator, DataTable, Searchbar } from "react-native-paper";
import { COLORS, FONTS, SIZES } from "../../assets/constants";
import ScoreService from "../../services/ScoreService";
import { mark2Color } from "../../utils/scoreUtils";
import { ErrorBoundaryTemplate } from "../ErrorBoundaryTemplate";
import { useContext } from "react";
import { ThemeContext } from "../../context/ThemeContext";
import ServerErrorTemplate from "../ServerErrorTemplate";
interface ListScoreModel extends ScoreModel {
  visible: boolean;
}

const ScoreDetail = () => {
  const [score, setScore] = useState<Array<ListScoreModel> | undefined | null>(
    undefined
  );
  const [searchQuery, setSearchQuery] = useState("");
  const [details, setDetails] = useState<ListScoreModel | undefined>(undefined);

  const [nocState, setNocState] = useState<
    "ascending" | "descending" | undefined
  >(undefined);

  const [markState, setMarkState] = useState<
    "ascending" | "descending" | undefined
  >(undefined);
  const [counter, setCounter] = useState<number>(0);
  const bottomSheetRef = useRef<BottomSheet>(null);
  const theme = useContext(ThemeContext);
  useEffect(() => {
    if (details) {
      bottomSheetRef.current!.snapToIndex(1);
    }
  }, [details]);

  useEffect(() => {
    (async () => {
      const scoreTemp = await ScoreService.getScore();
      if (scoreTemp !== null) {
        setScore(
          scoreTemp.map((e: ScoreModel) => {
            return {
              ...e,
              visible: true,
            };
          })
        );
      } else {
        setScore(null)
      }

    })();
  }, [counter]);

  useMemo(() => {
    if (score) {
      if (nocState === "descending") {
        setScore(score.sort((e1, e2) => e2.numberOfCredit - e1.numberOfCredit));
      }

      if (nocState === "ascending") {
        setScore(score.sort((e1, e2) => e1.numberOfCredit - e2.numberOfCredit));
      }

      if (markState === "descending") {
        setScore(
          score.sort((e1, e2) => {
            if (e1.mark < e2.mark) return -1;

            if (e1.mark > e2.mark) return 1;

            return 0;
          })
        );
      }

      if (markState === "ascending") {
        setScore(
          score.sort((e1, e2) => {
            if (e1.mark > e2.mark) return -1;

            if (e1.mark < e2.mark) return 1;

            return 0;
          })
        );
      }
    }
  }, [nocState, markState]);

  useMemo(() => {
    if (score) {
      setScore(
        score.map((e: ListScoreModel) => {
          if (e.subject.toLowerCase().includes(searchQuery.toLowerCase())) {
            return {
              ...e,
              visible: true,
            };
          } else {
            return {
              ...e,
              visible: false,
            };
          }
        })
      );
    }
  }, [searchQuery]);

  if (score === null) {
    return (
      <ServerErrorTemplate
        reconnect={() => {
          setCounter(counter + 1);
        }}
        message="Gặp sự cố khi kết nối đến máy chủ!!!"
      />
    )
  } else {
    return (
      <View
        style={{
          flex: 1,
          backgroundColor: theme!.grayPrimary,
        }}
      >
        <ErrorBoundaryTemplate>
          <Searchbar
            placeholder="Tìm kiếm môn học"
            onChangeText={(e) => {
              setSearchQuery(e);
            }}
            value={searchQuery}
            style={{
              elevation: 0,
              borderRadius: 0,
              borderBottomLeftRadius: 5,
              borderBottomRightRadius: 5,
              backgroundColor: theme!.primary,
            }}
            selectionColor={theme!.graySecondary}
            inputStyle={{
              ...FONTS.body3,
              width: "100%",
              color: theme!.graySecondary,
            }}
            placeholderTextColor={theme!.graySecondary}
          />

          <DataTable
            style={{
              flex: 1,
              backgroundColor: theme!.primary,
              margin: 10,
              borderRadius: 5,
              width: SIZES.width - 20,
              paddingBottom: 10,
            }}
          >
            <DataTable.Header>
              <DataTable.Title style={{ flex: 4, justifyContent: "center" }}>
                <Text style={{ ...FONTS.h4, color: theme!.secondary }}>
                  Môn học
                </Text>
              </DataTable.Title>
              <DataTable.Title
                numeric
                sortDirection={nocState}
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => {
                  setNocState((prev) => {
                    return prev === "ascending" ? "descending" : "ascending";
                  });
                }}
              >
                <Text style={{ ...FONTS.h4, color: theme!.secondary }}>
                  Tín chỉ
                </Text>
              </DataTable.Title>
              <DataTable.Title
                numeric
                sortDirection={markState}
                style={{ flex: 1, justifyContent: "center" }}
                onPress={() => {
                  setMarkState((prev) => {
                    return prev === "ascending" ? "descending" : "ascending";
                  });
                }}
              >
                <Text style={{ ...FONTS.h4, color: theme!.secondary }}>Điểm</Text>
              </DataTable.Title>
            </DataTable.Header>

            <ListScore score={score} setDetails={setDetails} />
          </DataTable>

          <BottomSheet
            //   @ts-ignore
            ref={bottomSheetRef}
            index={-1}
            snapPoints={useMemo(() => [1, 350, 450], [])}
            onAnimate={(_, to) => {
              if (to == -1 || to == 0) {
                setDetails(undefined);
              }
            }}
            backdropComponent={(backdropProps) => (
              <BottomSheetBackdrop {...backdropProps} enableTouchThrough={true} />
            )}
            backgroundStyle={{
              backgroundColor: theme!.primary,
              borderRadius: 5,
            }}
          >
            <View
              style={{
                marginTop: 10,
                elevation: 3,
              }}
            >
              <Text style={{ ...FONTS.h3, color: theme!.secondary, margin: 15 }}>
                {details?.subject}
              </Text>
              <DetailTable details={details} />
            </View>
          </BottomSheet>
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={() => { }}
            style={{
              alignSelf: "center",

            }}
          />
        </ErrorBoundaryTemplate>
      </View>
    );
  }
};

const ListScore = ({ score, setDetails }: any) => {
  const theme = useContext(ThemeContext);
  if (score) {
    return (
      <ScrollView>
        {score.map((e: ListScoreModel) => {
          if (e.visible) {
            return (
              <DataTable.Row
                key={e.id}
                style={{
                  borderLeftColor: mark2Color(e.mark),
                  borderLeftWidth: 4,
                }}
                onPress={() => {
                  setDetails(e);
                }}
              >
                <DataTable.Cell style={{ flex: 4 }}>
                  <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
                    {" "}
                    {e.subject}
                  </Text>
                </DataTable.Cell>
                <DataTable.Cell
                  numeric
                  style={{ flex: 1, justifyContent: "center" }}
                >
                  <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
                    {e.numberOfCredit}
                  </Text>
                </DataTable.Cell>

                <DataTable.Cell
                  numeric
                  style={{
                    flex: 1,
                    justifyContent: "center",
                  }}
                >
                  <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
                    {" "}
                    {e.mark}
                  </Text>
                </DataTable.Cell>
              </DataTable.Row>
            );
          }
        })}
      </ScrollView>
    );
  } else {
    return (
      <ActivityIndicator
        animating={true}
        color={theme!.secondary}
        style={{
          marginTop: 60,
        }}
      />
    );
  }
};

const DetailTable = ({ details }: { details: ListScoreModel | undefined }) => {
  const theme = useContext(ThemeContext);
  return (
    <DataTable
      style={{
        borderWidth: 1,
        borderColor: theme!.graySecondary,
        borderRadius: 5,
      }}
    >
      <DataTable.Row>
        <DataTable.Cell>
          <Text style={{ ...FONTS.h4, color: theme!.secondary }}>
            Số tín chỉ
          </Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
            {details?.numberOfCredit}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>

      <DataTable.Row>
        <DataTable.Cell>
          <Text style={{ ...FONTS.h4, color: theme!.secondary }}>
            Điểm quá trình
          </Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
            {details?.procedure}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>
          <Text style={{ ...FONTS.h4, color: theme!.secondary }}>Điểm thi</Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
            {details?.test}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
      <DataTable.Row>
        <DataTable.Cell>
          <Text style={{ ...FONTS.h4, color: theme!.secondary }}>
            Điểm học phần
          </Text>
        </DataTable.Cell>
        <DataTable.Cell numeric>
          <Text style={{ ...FONTS.body4, color: theme!.secondary }}>
            {details?.final}
          </Text>
        </DataTable.Cell>
      </DataTable.Row>
    </DataTable>
  );
};

export default ScoreDetail;
