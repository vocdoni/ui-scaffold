import { useEffect, useState } from 'react'
import { dummyZk, proveCircuit } from 'sequencer'
// import input from '/circuit/input.json';

const Sequencer = () => {
  const [dummyResult, setDummyResult] = useState<any>(null)
  const [proofResult, setProofResult] = useState<any>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const run = async () => {
      try {
        const dummy = await dummyZk()
        setDummyResult(dummy)

        const input = await fetch('/circuit/input.json').then((res) => res.json())

        const proof = await proveCircuit(input)
        setProofResult(proof)
      } catch (err) {
        setProofResult({ error: String(err) })
      } finally {
        setLoading(false)
      }
    }

    run()
  }, [])

  return (
    <main className='p-8 font-mono'>
      <h1 className='text-2xl font-bold mb-4'>SnarkJS Playground</h1>

      <section className='mb-8'>
        <h2 className='text-xl font-semibold'>Dummy Result</h2>
        <pre className='bg-gray-100 p-4 rounded mt-2'>{JSON.stringify(dummyResult, null, 2)}</pre>
      </section>

      <section>
        <h2 className='text-xl font-semibold'>zkSNARK Proof Result</h2>
        {loading ? (
          <p>Generating proof...</p>
        ) : (
          <pre className='bg-gray-100 p-4 rounded mt-2 overflow-auto'>{JSON.stringify(proofResult, null, 2)}</pre>
        )}
      </section>
    </main>
  )
}

export default Sequencer
