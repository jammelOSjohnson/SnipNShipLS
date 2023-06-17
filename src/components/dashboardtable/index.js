import { useEffect, useState } from 'react';
import Moment from 'moment';
import { AppNewsUpdate } from '../../sections/@dashboard/app';
// Context
import { useGeneral } from '../../context/general';

function createData(TrackingNum, Name, Description, Status, OrderDate) {
  return { TrackingNum, Name, Description, Status, OrderDate };
}

export default function DashboardTable() {
  const { value } = useGeneral();
  const [rows, setRows] = useState([]);
  const { packages, fetchPackages, currentUser } = value;

  useEffect(() => {
    if (currentUser != null && rows.length === 0) {
      try {
        // console.log('about to fetch packs');
        // console.log(packages);
        // console.log(currentUser);
        fetchPackages(currentUser.uid, value);
      } catch {
        // console.log('unable to fetch packs');
      }
    }

    if (packages !== undefined) {
      const tempRows = [];
      packages.map((item) => {
        const convertedDate = Moment(item.OrderDate.toDate());
        tempRows.push(createData(item.TrackingNumber, item.ItemName, '', item.ItemStatus, convertedDate));
        return null;
      });
      setRows(tempRows);
    }
  }, [packages]);

  return (
    <AppNewsUpdate
      title="New Package(s)"
      list={
        rows !== []
          ? rows.slice(0, 5).map((item) => ({
              id: item.TrackingNum,
              title: item.Name,
              description: '',
              image: `/assets/images/products/package.png`,
              postedAt: item.OrderDate,
            }))
          : []
      }
    />
  );
}
