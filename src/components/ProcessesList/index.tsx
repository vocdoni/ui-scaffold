import { Box, Flex, HStack, Spinner } from '@chakra-ui/react';
import { useClientContext } from '@vocdoni/react-components';
import { PublishedElection } from '@vocdoni/sdk';
import { useEffect, useState } from 'react';
import { FormProvider, useForm } from 'react-hook-form';
import { getElectionsToDisplay } from '../../lib/processList/filterElections';
import ProcessesListFilters from './ProcessesListFilters';
import ProcessListRow from './ProcessListRow';

export interface PropsFilters {
	search: string;
	onlyCurrentElections: boolean;
}

const IDS = [
	'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000000',
	'c5d2460186f72e5b02237f4489d53a7fe4ae2134fabef8323507020400000002'
];

const ProcessesList = () => {
	const { client, account } = useClientContext();
	const [electionsList, setElectionsList] = useState<PublishedElection[]>([]);

	const methodsFilters = useForm<PropsFilters>({
		defaultValues: {
			search: '',
			onlyCurrentElections: false
		}
	});

	methodsFilters.watch(['onlyCurrentElections', 'search']);

	const electionsListFiltered = getElectionsToDisplay(
		electionsList,
		methodsFilters.getValues()
	);

	useEffect(() => {
		if (!account || electionsList.length) return;

		Promise.allSettled([
			client.fetchElection(IDS[0]),
			client.fetchElection(IDS[1])
		])
			.then(res =>
				res.filter(el => el.status === 'fulfilled').map((el: any) => el.value)
			)
			.then(res => setElectionsList(res));
		// client
		// 	.fetchElections()
		// 	.then(res => setElectionsList(res))
		// 	.catch(err => {
		// 		throw new Error();
		// 	});
	}, [client, account, electionsList.length]);

	return (
		<Box m='16px auto' p={4} width={{ base: '97%', md: '650px' }}>
			<FormProvider {...methodsFilters}>
				<ProcessesListFilters />
			</FormProvider>

			<HStack>
				{!electionsList.length && <Spinner size='lg' marginX='auto' mt={12} />}
			</HStack>

			<Flex direction='column' gap={4} mt={8} mx='auto'>
				{electionsListFiltered?.map((el: PublishedElection) => (
					<ProcessListRow
						key={el.id}
						el={el}
						setElectionsList={setElectionsList}
					/>
				))}
			</Flex>
		</Box>
	);
};

export default ProcessesList;
