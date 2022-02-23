import React, { useContext, useEffect, useState } from "react";
import { View } from "react-native";
import { TuitionService } from "../services/TuitionService";
import NetInfo from "@react-native-community/netinfo";
import TuiTionChart from "../templates/tuition_fee/TuiTionChart";
import TuitionList from "../templates/tuition_fee/TuitionList";
import ServerErrorTemplate from "../templates/ServerErrorTemplate";
import { ErrorBoundaryTemplate } from "../templates/ErrorBoundaryTemplate";
import { AdMobBanner } from "expo-ads-admob";
import { ThemeContext } from "../context/ThemeContext";

const TuitionFee = () => {
  const [tuition, setTuition] = useState<TuitionModel | undefined | null>(
    undefined
  );
  const [isConnected, setIsConnected] = useState<boolean | null>(null);
  const [counter, setCounter] = useState<number>(0);
  const theme = useContext(ThemeContext);

  useEffect(() => {
    NetInfo.fetch().then((state) => {
      setIsConnected(state.isConnected);
      if (state.isConnected === true) {
        (async () => {
          const tuitionService = new TuitionService();
          const data = await tuitionService.fetchTuition();
          setTuition(data);
        })();
      }
    });
  }, [counter]);

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme!.grayPrimary,
      }}
    >
      <ErrorBoundaryTemplate>
        {isConnected === false ? (
          <ServerErrorTemplate
            reconnect={() => {
              setTuition(undefined);
              setCounter(counter + 1);
            }}
            message="vui lòng kiểm tra kết nối internet và thử lại!!!"
          />
        ) : tuition !== null ? (
          <>
            <TuitionList tuition={tuition} />
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
          </>
        ) : (
          <ServerErrorTemplate
            reconnect={() => {
              setCounter(counter + 1);
            }}
            message="Gặp sự cố khi kết nối đến máy chủ!!!"
          />
        )}
      </ErrorBoundaryTemplate>
    </View>
  );
};

export default TuitionFee;
