import ChampionsList from "./champions-list";

export default async function ChampionsPage({
  params,
}: {
  params: { id: string };
}) {
  const { id } = params;

  return (
      <div>
          <ChampionsList id={id} />
      </div>
  );
}