// RecentActivity.jsx
// Usage:
// import { RecentActivity, ActivityItem } from "../components/RecentActivity"
//
// <RecentActivity>
//   <ActivityItem group="Today">
//     <ActivityRow label="Transaction No. 3" sub="View and Restock Soon" time="12:35AM" />
//     <ActivityRow label="Transaction No. 2" sub="View and Restock Soon" time="12:35AM" />
//   </ActivityItem>
//   <ActivityItem group="Yesterday">
//     <ActivityRow label="Transaction No. 3" sub="View and Restock Soon" time="12:35AM" />
//   </ActivityItem>
// </RecentActivity>

// ── Single transaction row ──
export function ActivityRow({
  label = "Transaction",
  sub = "",
  time = "",
  onPress,
}) {
  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Manrope:wght@500;600;700;800&display=swap');

        .ar-row {
          display: flex;
          align-items: center;
          gap: 14px;
          padding: 12px 0;
          border-bottom: 1px solid #F2F2F2;
          cursor: pointer;
          font-family: 'Manrope', sans-serif;
          transition: background 0.1s;
        }
        .ar-row:last-child { border-bottom: none; }
        .ar-row:active { background: #FFF8F2; }

        .ar-icon {
          width: 46px;
          height: 46px;
          background: #FFF0E6;
          border-radius: 14px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .ar-info {
          flex: 1;
          display: flex;
          flex-direction: column;
          gap: 3px;
        }
        .ar-label {
          font-size: 15px;
          font-weight: 700;
          color: #1A1A1A;
        }
        .ar-sub {
          font-size: 12px;
          font-weight: 500;
          color: #BBB;
        }
        .ar-time {
          font-size: 11px;
          font-weight: 500;
          color: #CCC;
          flex-shrink: 0;
        }
      `}</style>

      <div className="ar-row" onClick={onPress}>
        <div className="ar-icon">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="10" stroke="#E8821A" strokeWidth="1.8"/>
            <path d="M8 10h8M8 14h8" stroke="#E8821A" strokeWidth="1.8" strokeLinecap="round"/>
            <path d="M15 7l-3 3-3-3" stroke="#E8821A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M9 17l3-3 3 3" stroke="#E8821A" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
        </div>

        <div className="ar-info">
          <span className="ar-label">{label}</span>
          {sub && <span className="ar-sub">{sub}</span>}
        </div>

        <span className="ar-time">{time}</span>
      </div>
    </>
  );
}

// ── Group with label (TODAY / YESTERDAY) ──
export function ActivityGroup({ group = "Today", children }) {
  return (
    <>
      <style>{`
        .ag-group { margin-bottom: 4px; }
        .ag-label {
          font-size: 11px;
          font-weight: 700;
          color: #CCC;
          letter-spacing: 0.8px;
          text-transform: uppercase;
          margin-bottom: 2px;
          font-family: 'Manrope', sans-serif;
        }
      `}</style>

      <div className="ag-group">
        <div className="ag-label">{group}</div>
        {children}
      </div>
    </>
  );
}

// ── Full Recent Activity section ──
export function RecentActivity({ children }) {
  return (
    <>
      <style>{`
        .ra-wrap {
          font-family: 'Manrope', sans-serif;
        }
        .ra-title {
          font-size: 13px;
          font-weight: 800;
          color: #1A1A1A;
          letter-spacing: 1px;
          text-transform: uppercase;
          margin-bottom: 14px;
        }
        .ra-groups {
          display: flex;
          flex-direction: column;
          gap: 12px;
        }
      `}</style>

      <div className="ra-wrap">
        <div className="ra-title">Recent Activity</div>
        <div className="ra-groups">{children}</div>
      </div>
    </>
  );
}

export default RecentActivity;