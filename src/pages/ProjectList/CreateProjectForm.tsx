import React from 'react';
import { useRequest } from '@umijs/hooks';
import { history } from 'umi';
import SchemaForm, { Submit, Reset, FormButtonGroup } from '@uform/next';
import { Button } from '@alifd/next';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import project from '@/assets/formjson/project.json';
import '@alifd/next/dist/next.css';
import { message, Card, Cascader } from 'antd';
import { FormEffectsParams, FormStateProps } from '@/utils/uformtools';
import useSchema from '@/hooks/useSchema';
import { createRichTextUtils } from '@/components/ExtraFormilyItem';
import useBraftEditor from '@/hooks/useBraftEditor';
import BraftEditor from 'braft-editor';
import region from '@/assets/region';
import { ContentTypeItem } from './data';
import { apiGetRelateModelsList, apiSubmitPrjectForm } from './service';
import 'braft-editor/dist/index.css';

const CreateProjectForm = () => {
  const { schema, setProperties } = useSchema(project);
  const { content, setContent, contentToHtml } = useBraftEditor();

  const CustomComponent = (props: any) => {
    return (
      <div style={{ border: '1px solid #ccc' }}>
        <BraftEditor
          value={content}
          onChange={(val) => {
            setContent(val);
            props.onChange(val);
          }}
        />
      </div>
    );
  };

  const Cascade = (props: any) => {
    return (
      <Cascader options={region} value={props.value} onChange={(val) => props.onChange(val)} />
    );
  };

  const newField = {
    name: 'test',
    data: {
      type: 'string',
      title: '测试',
      required: true,
    },
  };

  setProperties(newField);

  const submit = useRequest(apiSubmitPrjectForm, {
    manual: true,
    onSuccess: () => message.success('添加成功'),
  });
  const { run } = submit;

  const createProject = (val: any) => {
    const newVal = {
      ...val,
      rich_text: contentToHtml(),
    };
    run(newVal);
  };

  const formEffects = ($: any, { setFieldState }: FormEffectsParams) => {
    $('onFormMount').subscribe(() => {
      apiGetRelateModelsList().then((res) => {
        const relateModelsEnum = res?.data.map((item: ContentTypeItem) => ({
          label: `${item.app_label}_${item.model}`,
          value: item.id,
        }));
        setFieldState('relate_models', (state: FormStateProps) => {
          const newState = state;
          newState.props.enum = relateModelsEnum;
        });
      });
    });
  };

  return (
    <PageHeaderWrapper content="请填写项目详情">
      <Card bordered={false}>
        <SchemaForm
          onSubmit={createProject}
          schema={schema}
          components={{ CustomComponent, Cascade }}
          labelCol={7}
          wrapperCol={12}
          expressionScope={createRichTextUtils()}
          initialValues={{ status: 0 }}
          effects={formEffects}
        >
          <FormButtonGroup offset={10}>
            <Submit />
            <Reset />
            <Button onClick={() => history.goBack()}>返回</Button>
          </FormButtonGroup>
        </SchemaForm>
      </Card>
    </PageHeaderWrapper>
  );
};

export default CreateProjectForm;
