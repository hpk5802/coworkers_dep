import axios from '@/app/lib/instance';
import { GroupResponse } from '@/app/types/grouptask';

const getGroupById = async (id: number): Promise<GroupResponse> => {
  const res = await axios.get<GroupResponse>(`/groups/${id}`);

  return res.data;
};

export default getGroupById;
