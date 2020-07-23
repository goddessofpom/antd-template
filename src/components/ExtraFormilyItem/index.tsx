import React from 'react';
import { Tooltip } from 'antd';
import { QuestionCircleOutlined } from '@ant-design/icons';

export function createRichTextUtils() {
  return {
    help(text: string, offset: number = 3) {
      return React.createElement(
        Tooltip,
        { title: text, overlay: null },
        <QuestionCircleOutlined
          style={{ margin: '0 3px', cursor: 'default', marginLeft: offset }}
        />,
      );
    },
  };
}
