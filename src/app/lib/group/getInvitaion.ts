import axios from '@/app/lib/instance';

const getInvitation = async (id: number): Promise<string> => {
  const res = await axios.get<string>(`/groups/${id}/invitation`);

  return res.data;
};

export default getInvitation;
