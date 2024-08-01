
import { useAtom } from 'jotai';
import * as atoms from '../stores/atoms';
import Card from './Card';

export default function Home() {

  const [userConfigAtom, setUserConfigAtom] = useAtom(atoms.userConfigAtom)


  const handleDelete = async (uuid) => {
    const newItems = userConfigAtom.filter((item) => item.uuid !== uuid);
    await setUserConfigAtom(newItems);
  };

  return (
    <>
      <div className="card_list">
        {userConfigAtom.map(config =>
          <Card key={config.uuid} totpConfig={config} onDelete={() => handleDelete(config.uuid)} />
        )}
      </div>
    </>
  )
}


