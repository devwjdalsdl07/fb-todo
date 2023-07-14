import React from "react";
import { ResponsiveBar } from "@nivo/bar";
import axios from "axios";

const TodoChart = () => {
  const data = [
    { bottle: "365ml", cola: 1200, cidar: 1000, fanta: 1100 },
    { bottle: "500ml", cola: 2200, cidar: 2000, fanta: 2100 },
    { bottle: "1000ml", cola: 3200, cidar: 3000, fanta: 3100 },
  ];
  return (
    <div className="p-6 mt-5 shadow rounded bg-white">
      <h2>Todochart</h2>
      <div style={{ height: "400px" }}>
        <ResponsiveBar
          data={data}
          //   chart 에서 보여질 데이터 key (측정되는 값)
          keys={["cola", "cidar", "fanta"]}
          //   keys 를 그룹화하는 index key (분류)
          indexBy="bottle"
          //   chart 간의 여백 (bar 간의 여백)
          padding={0.3}
          // 차트 색상
          colors={["olive", "brown", "orange"]}
          //   색상을 적용함
          colorBy="id"
          //   테마 설정
          theme={[
            {
              // label style (bar 에 표현되는 글씨)
              labels: {
                text: {
                  fontSize: 14,
                  fill: "#000000",
                },
              },
              //   legend 스타일 (우측 하단에 있는 색상별 key)
              legends: {
                text: {
                  fontSize: 10,
                  fil: "#ff0000",
                },
              },
              // axios legend 스타일 (botto, left 글씨)
              axios: {
                legend: {
                  text: {
                    fontSize: 20,
                    fill: "#ffff00",
                  },
                },
                ticks: {
                  text: {
                    fontSize: 16,
                    fill: "#0000ff",
                  },
                },
              },
            },
          ]}
          //   axiosBottom 설정
          axisBottom={{
            tickSize: 5, // 값 설명하기 위해 보여지는 점 크기
            tickPadding: 5,
            tickRotation: 0, //점의 기울기
          }}
          enableGridY={true}
          enableLabel={false}
        />
      </div>
    </div>
  );
};

export default TodoChart;
