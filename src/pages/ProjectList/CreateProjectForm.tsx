import React from 'react';
import { useRequest } from '@umijs/hooks';
import { history } from 'umi';
import SchemaForm, { Submit, Reset, FormButtonGroup } from '@uform/next';
import { Button } from '@alifd/next';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import project from '@/assets/formjson/project.json';
import '@alifd/next/dist/next.css';
import { message, Card } from 'antd';
import { FormEffectsParams, FormStateProps } from '@/utils/uformtools';
import { ContentTypeItem } from './data';
import { apiGetRelateModelsList, apiSubmitPrjectForm } from './service';

const CreateProjectForm = () => {
  const submit = useRequest(apiSubmitPrjectForm, {
    manual: true,
    onSuccess: () => message.success('添加成功'),
  });
  const { run } = submit;

  const formEffects = ($: any, { setFieldState }: FormEffectsParams) => {
    $('onFormMount').subscribe(() => {
      apiGetRelateModelsList().then((res) => {
        const relateModelsEnum = res.data.map((item: ContentTypeItem) => ({
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
          onSubmit={(val) => run(val)}
          schema={project}
          labelCol={7}
          wrapperCol={12}
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
