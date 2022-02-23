import React, { useEffect, useState } from "react";
import { View, ScrollView } from "react-native";
import { TestService } from "../services/TestService";
import TestCard from "../components/TestCard";
import ServerErrorTemplate from "../templates/ServerErrorTemplate";
import { AdMobBanner } from "expo-ads-admob";
import { ActivityIndicator } from "react-native-paper";
import UpdateTemplate from "../templates/UpdateTemplate";
import { ThemeContext } from "../context/ThemeContext";
import { useContext } from "react";
const TestSchedule = ({ navigation }: any) => {
  const [counter, setCounter] = useState<number>(0);
  const theme = useContext(ThemeContext);
  const [tests, setTests] = useState<
    | {
        data: TestModel[];
        lastUpdate: number;
      }
    | undefined
    | null
  >(undefined);

  useEffect(() => {
    (async () => {
      setTests(await TestService.getTest());
    })();
  }, [counter]);

  useEffect(() => {
    if (tests) {
      TestService.updateTestWithoutDownload(tests);
    }
  }, [tests]);

  return (
    <View style={{ flex: 1, backgroundColor: theme!.grayPrimary }}>

      {tests === null ? (
        <ServerErrorTemplate
          reconnect={() => {
            setCounter(counter + 1);
          }}
          message="Kết nối thất bại"
        />
      ) : (
        <>
          <UpdateTemplate
            update={() => {
              (async () => {
                setTests(undefined);
                const temp = await TestService.updateTest();
                if (temp) {
                  setTests(temp);
                } else {
                  setTests(null);
                }
              })();
            }}
            lastUpdate={tests && tests.lastUpdate}
          />

          <TestList tests={tests} />
          <AdMobBanner
            bannerSize="banner"
            adUnitID="ca-app-pub-3940256099942544/6300978111"
            servePersonalizedAds // true or false
            onDidFailToReceiveAdWithError={() => {}}
            style={{
              alignSelf: "center",
              position: "absolute",
              bottom: 10,
            }}
          />
        </>
      )}
    </View>
  );
};

const TestList = ({
  tests,
}: {
  tests:
    | undefined
    | {
        data: TestModel[];
        lastUpdate: number;
      };
}) => {
  const theme = useContext(ThemeContext);
  if (tests) {
    return (
      <ScrollView style={{ flex: 1, marginTop: -10, paddingTop: 10 }}>
        {tests.data.map((e: TestModel, i: number) => (
          <TestCard test={e} key={i}  />
        ))}
        <View
          style={{
            marginBottom: 5,
            height: 80,
            width: "100%",
            backgroundColor: theme!.grayPrimary,
          }}
        />
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

export default TestSchedule;
