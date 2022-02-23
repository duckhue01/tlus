import React from "react";
import { Text, View } from "react-native";
import { Button, Snackbar } from "react-native-paper";
import { COLORS, FONTS, SIZES } from "../assets/constants";
import SomeThingWentWrong from "../assets/svg/SomeThingWentWrong";

export class ErrorBoundaryTemplate extends React.Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = { hasError: false, visible: false };
  }

  static getDerivedStateFromError(error: any) {
    // Update state so the next render will show the fallback UI.
    return { hasError: true };
  }

  componentDidCatch(error: any, errorInfo: any) {
    // You can also log the error to an error reporting service
    //   logErrorToMyService(error, errorInfo);
  }

  render() {
    if (this.state.hasError === true) {

      return (
        <View
          style={{
            flex: 1,
            backgroundColor: COLORS.white,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <SomeThingWentWrong
            width={200}
            height={180}
            color="black"
          />
          <Text
            style={{
              marginTop: 10,
              ...FONTS.h4,
              color: "black",
              textAlign: "center",
              width: SIZES.width - 80,
            }}
          >
            Có cái gì đó sai sai !!!
          </Text>
          <Button
            mode="contained"
            onPress={() => {
              setTimeout(() => {
                this.setState({
                  ...this.state,
                  visible: true,
                });
              }, 2000);
            }}
            labelStyle={{
              ...FONTS.h4,
              letterSpacing: 0,
            }}
            style={{
              marginTop: 10,
            }}
            theme={{
              colors: {
                primary: "black"
              },
            }}
          >
            Báo cáo
          </Button>

          <Snackbar
            visible={this.state.visible}
            onDismiss={() => {
              this.setState({
                ...this.state,
                visible: false,
              });
            }}
            duration={5000}
          >
            <Text
              style={{
                ...FONTS.body4,
              }}
            >
              Cảm ơn bạn, chúng tôi đã nhận được thông tin về sự cố không đáng
              có này
            </Text>
          </Snackbar>
        </View>
      );
    }

    return this.props.children;
  }
}
