import { useClientContext } from '@vocdoni/react-components';
import { useEffect, useState } from 'react';
import { UpdatedBalanceContext } from '../../lib/contexts/UpdatedBalanceContext';

interface Props {
	children: JSX.Element;
}

const UpdateBalanceProvider = ({ children }: Props) => {
	const { client, account } = useClientContext();

	const [updatedBalance, setUpdatedBalance] = useState<number | undefined>();

	const updateBalance = () => setUpdatedBalance(0);

	useEffect(() => {
		if (!account) return;

		client
			.fetchAccountInfo()
			.then(res => {
				setUpdatedBalance(res.balance);
			})
			.catch(console.log);
	}, [client, account, updatedBalance]);

	return (
		<UpdatedBalanceContext.Provider value={{ updatedBalance, updateBalance }}>
			{children}
		</UpdatedBalanceContext.Provider>
	);
};

export default UpdateBalanceProvider;
