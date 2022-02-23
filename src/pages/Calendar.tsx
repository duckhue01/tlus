import BottomSheet from "@gorhom/bottom-sheet";
import React, {
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { Agenda, CustomMarking } from "react-native-calendars";
import { FONTS } from "../assets/constants";
import CalendarDay from "../components/CalendarDay";
import CalendarItem from "../components/CalendarItem";
import CalendarService from "../services/CalendarService";
import EmptyDay from "../templates/calendar/EmptyDay";
import { CalendarData, timeStamp2String } from "../utils/dateUtils";
import BottomSheetCalendar from "../templates/calendar/BottomSheetCalendar";
import { TouchableOpacity, View, Text } from "react-native";
import UpdateTemplate from "../templates/UpdateTemplate";
import ServerErrorTemplate from "../templates/ServerErrorTemplate";
import { ActivityIndicator } from "react-native-paper";
import AdMobBanner from "expo-ads-admob/build/AdMobBanner";
import { ErrorBoundaryTemplate } from "../templates/ErrorBoundaryTemplate";
import { ThemeContext } from "../context/ThemeContext";

const Calendar = () => {
  const theme = useContext(ThemeContext);
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: theme!.grayPrimary,
      }}
    >
      <ErrorBoundaryTemplate>
        <Main />
      </ErrorBoundaryTemplate>
    </View>
  );
};

const Main = () => {
  const [sheet, setSheet] = useState<Subject | undefined>(undefined);
  const bottomSheetCalenderRef = useRef<BottomSheet>(null);
  const [calendar, setCalendar] = useState<
    | {
      data: CalendarData;
      lastUpdate: number;
    }
    | undefined
    | null
  >();


  const [mark, setMark] = useState<{
    [date: string]: CustomMarking;
  }>();
  const theme = useContext(ThemeContext);

  useEffect(() => {
    (async () => {
      const temp: {
        data: CalendarData;
        lastUpdate: number;
      } | null = await CalendarService.getCalendar();
      addEmpty(temp);
    })();
  }, []);
  useEffect(() => {
    if (sheet) {
      bottomSheetCalenderRef.current?.snapToIndex(1);
    }
  }, [sheet]);

  const addEmpty = useCallback(
    (
      temp: {
        data: CalendarData;
        lastUpdate: number;
      } | null
    ) => {
      if (temp !== null) {
        const {
          data,
          lastUpdate,
        }: {
          data: CalendarData | { [key: string]: any };
          lastUpdate: number;
        } = temp;

        const mark: { [date: string]: CustomMarking } = {};

        Object.keys(data).forEach((e) => {
          Object.assign(mark, {
            [e]: { marked: true },
          });
        });

        const dateArray = Array.from(Object.keys(data), (e) =>
          new Date(e).getTime()
        );
        const min = Math.min(...dateArray);
        const max = Math.max(...dateArray);

        for (let i = min; i <= max; i += 24 * 60 * 60 * 1000) {
          const key = timeStamp2String(i);
          if (!data[key]) data[key] = [];
        }
        setCalendar({
          data: data,
          lastUpdate,
        });
        setMark(mark);
      } else {
        setCalendar(null);
      }
    },
    []
  );

  const calendarRef = useRef<any>(undefined);

  return (
    <>
      {calendar === null ? (
        <ServerErrorTemplate message="Sự cố khi kết nối với server" />
      ) : (
        <>
          <UpdateTemplate
            update={() => {
              (async () => {
                setCalendar(undefined);
                const temp = await CalendarService.updateCalendar();
                addEmpty(temp);
              })();
            }}
            lastUpdate={calendar && calendar.lastUpdate}
          />
          {calendar !== undefined ? (
            <>
              <Agenda
                key={theme!.primary}
                ref={calendarRef}
                selected={timeStamp2String(Date.now())}
                markedDates={mark}
                items={calendar.data}
                renderDay={(day) => <CalendarDay day={day} />}
                renderItem={(item: any, firstItem: any) => (
                  <CalendarItem
                    item={item}
                    firstItem={firstItem}
                    setSheet={setSheet}
                  />
                )}
                rowHasChanged={() => false}
                renderEmptyDate={() => null}
                renderEmptyData={() => <EmptyDay />}
                theme={{
                  textDayFontFamily: "Ubuntu_400Regular",
                  textMonthFontFamily: "Ubuntu_400Regular",
                  textDayHeaderFontFamily: "Ubuntu_400Regular",
                  selectedDayBackgroundColor: theme!.secondary,
                  selectedDayTextColor: theme!.grayPrimary,
                  dotColor: theme!.secondary,
                  todayTextColor: theme!.secondary,
                  agendaKnobColor: theme!.secondary,
                  backgroundColor: theme!.grayPrimary,
                  calendarBackground: theme!.primary,
                  dayTextColor: theme!.graySecondary,
                  monthTextColor: theme!.graySecondary,
                }}
                style={{
                  borderTopRightRadius: 5,
                  borderTopLeftRadius: 5,
                }}
              />
              <TouchableOpacity
                style={{
                  position: "absolute",
                  bottom: 80,
                  right: 50,
                  backgroundColor: theme!.secondary,
                  borderRadius: 50,
                  padding: 10,
                }}
                onPress={() => {
                  calendarRef.current?.onDayChange(
                    timeStamp2String(Date.now())
                  );
                }}
              >
                <Text
                  style={{
                    ...FONTS.h4,
                    color: theme!.primary,
                  }}
                >
                  Hôm nay
                </Text>
              </TouchableOpacity>
              <BottomSheetCalendar
                ref={bottomSheetCalenderRef}
                sheet={sheet}
                setSheet={setSheet}
              />
              <AdMobBanner
                bannerSize="banner"
                adUnitID="ca-app-pub-3940256099942544/6300978111"
                servePersonalizedAds // true or false
                onDidFailToReceiveAdWithError={() => { }}
                style={{
                  alignSelf: "center",
                  position: "absolute",
                  bottom: 0,
                }}
              />
            </>
          ) : (
            <ActivityIndicator
              animating={true}
              color={theme!.secondary}
              style={{
                marginTop: 60,
              }}
            />
          )}
        </>
      )}
    </>
  );
};

export default React.memo(Calendar);
