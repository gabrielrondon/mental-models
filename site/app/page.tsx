import models from "@/data/models.json";
import graph from "@/data/graph.json";
import matrix from "@/data/matrix.json";
import meta from "@/data/meta.json";
import type { Graph, MatrixRow, Meta, Model } from "@/lib/types";
import { ModelProvider } from "@/lib/store";
import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Diagnoser } from "@/components/diagnoser";
import { Library } from "@/components/library";
import { LatticeGraph } from "@/components/lattice-graph";
import { Tooling } from "@/components/tooling";
import { Footer } from "@/components/footer";
import { ModelDrawer } from "@/components/model-drawer";
import { MyLattice } from "@/components/my-lattice";

export default function Page() {
  const m = meta as Meta;
  return (
    <ModelProvider models={models as Model[]}>
      <Nav />
      <main>
        <Hero meta={m} />
        <div className="hairline" />
        <Diagnoser matrix={matrix as MatrixRow[]} />
        <div className="hairline" />
        <Library meta={m} />
        <div className="hairline" />
        <MyLattice />
        <div className="hairline" />
        <LatticeGraph graph={graph as Graph} />
        <div className="hairline" />
        <Tooling meta={m} />
      </main>
      <Footer builtAt={m.builtAt} />
      <ModelDrawer />
    </ModelProvider>
  );
}
