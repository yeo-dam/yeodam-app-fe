import * as React from "react";

import { Text, TextProps } from "../../Themed";

function Typography(props: TextProps) {
  return (
    <Text
      {...props}
      style={[props.style, { fontFamily: "Spoqa-Han-Sans-Neo" }]}
    />
  );
}

export default Typography;
