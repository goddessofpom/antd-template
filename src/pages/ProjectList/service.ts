import request from '@/utils/request';

interface FormData {
  name: string;
  desc?: string;
  status: number;
  relate_models: Array<number>;
}

interface PatchFormData {
  id: string;
  [propName: string]: any;
}

export async function apiGetProjectList(params: any) {
  return request('/api/v1/project', {
    params,
  });
}

export async function apiGetRelateModelsList() {
  return request('/api/v1/content_type');
}

export async function apiSubmitPrjectForm(data: FormData) {
  return request('/api/v1/project', {
    method: 'POST',
    data,
  });
}

export async function apiGetProjectDetail(id: string) {
  return request(`/api/v1/project/${id}`);
}

export async function apiEditProject(data: PatchFormData, id: string) {
  return request(`/api/v1/project/${id}`, {
    method: 'PATCH',
    data,
  });
}
