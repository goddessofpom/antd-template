import React from 'react';
import { useRequest } from '@umijs/hooks';
import { history, useParams } from 'umi';
import SchemaForm, { Submit, Reset, FormButtonGroup } from '@uform/next';
import { Button } from '@alifd/next';
import { PageHeaderWrapper } from '@ant-design/pro-layout';
import project from '@/assets/formjson/project.json';
import { message, Card } from 'antd';
import '@alifd/next/dist/next.css';
import { FormEffectsParams, FormStateProps } from '@/utils/uformtools';
import { ContentTypeItem } from './data';
import { apiGetRelateModelsList, apiGetProjectDetail, apiEditProject } from './service';

const UpdateProjectForm = () => {
  const params: { id: string } = useParams();

  const submit = useRequest(apiEditProject, {
    manual: true,
    onSuccess: () => message.success('修改成功'),
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

      apiGetProjectDetail(params.id).then((res) => {
        const obj = res.data;
        Object.keys(obj).forEach((key) => {
          setFieldState(key, (state: FormStateProps) => {
            // Object.defineProperty(state, "value", {value: obj[key]})
            const newState = state;
            newState.value = obj[key];
          });
        });
      });
    });
  };

  return (
    <PageHeaderWrapper content="编辑项目详情">
      <Card bordered={false}>
        <SchemaForm
          schema={project}
          labelCol={7}
          wrapperCol={12}
          effects={formEffects}
          onSubmit={(val) => run(val, params.id)}
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

export default UpdateProjectForm;
