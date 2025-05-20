// ViewProfileModal.jsx
import {
  Dialog,
  DialogHeader,
  DialogBody,
  DialogFooter,
  Button,
  Card,
  Typography,
  Chip,
  Progress,
  IconButton,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";

export default function ViewProfileModal({ open, onClose }) {
  return (
    <Dialog
      size="lg"
      open={open}
      handler={onClose}
      className="bg-transparent shadow-none"
    >
      <Card className="p-4 md:p-6 rounded-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-4">
          <DialogHeader className="text-[#1c96c5]">
            View Profile
          </DialogHeader>
          <IconButton variant="text" onClick={onClose}>
            <XMarkIcon className="h-5 w-5 text-gray-600" />
          </IconButton>
        </div>

        <DialogBody className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <ProfileRow label="Name" value="Egbumokei Isaac" />
            <ProfileRow label="Email" value="isaac@example.com" />
            <ProfileRow label="Reg. Date" value="May 12, 2023" />
            <ProfileRow label="Status" value="Active" chip />
            <ProfileRow label="Class" value="Senior A" />
            <ProfileRow label="Score" value="89 / 100" />
            <ProfileRow label="Level" value="Intermediate" />
            <div className="md:col-span-2">
              <Typography variant="small" className="text-blue-gray-500 mb-2">
                Performance
              </Typography>
              <Progress
                value={89}
                color="blue"
                className="h-3"
                style={{ backgroundColor: "#d1ecf6" }}
                barProps={{ style: { backgroundColor: "#1c96c5" } }}
              />
            </div>
            <div className="md:col-span-2">
              <Typography variant="small" className="text-blue-gray-500 mb-2">
                Certificate
              </Typography>
              <Button color="blue" size="sm" className="bg-[#1c96c5]">
                Download Certificate
              </Button>
            </div>
          </div>
        </DialogBody>

        <DialogFooter>
          <Button
            variant="text"
            color="gray"
            onClick={onClose}
            className="mr-2"
          >
            Close
          </Button>
        </DialogFooter>
      </Card>
    </Dialog>
  );
}

function ProfileRow({ label, value, chip = false }) {
  return (
    <div>
      <Typography variant="small" className="text-blue-gray-500 mb-1">
        {label}
      </Typography>
      {chip ? (
        <Chip
          value={value}
          className="bg-[#1c96c5] text-white w-fit"
          size="sm"
        />
      ) : (
        <Typography className="font-medium text-blue-gray-800">
          {value}
        </Typography>
      )}
    </div>
  );
}
