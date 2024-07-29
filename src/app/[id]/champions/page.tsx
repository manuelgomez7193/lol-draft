import Team from "./team";
import ChampionsList from "./champions-list";
import '../../../lib/fontawesome';

export default async function ChampionsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
      <div>
          <Team/>
          <ChampionsList id={id} />
      </div>
  );
}